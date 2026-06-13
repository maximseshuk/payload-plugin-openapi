import type { SanitizedConfig } from 'payload'
import type { ParameterObject, PathsObject } from '@scalar/openapi-types/3.2'

import type { BuildContext } from '../../types.js'
import { makeT } from '../../translations/index.js'
import { errorResponses, jsonResponse } from '../components.js'

const boolParam = (name: string, description: string): ParameterObject => ({
  name,
  in: 'query',
  description,
  schema: { type: 'boolean' },
})

const collectQueues = (jobs: Record<string, unknown> | undefined): string[] => {
  const queues = new Set<string>(['default'])

  const add = (q: unknown) => {
    if (typeof q === 'string' && q) queues.add(q)
  }
  const fromSchedules = (items: unknown) => {
    if (!Array.isArray(items)) return
    for (const item of items as Array<{ schedule?: Array<{ queue?: unknown }> }>) {
      for (const s of item.schedule ?? []) add(s.queue)
    }
  }

  fromSchedules(jobs?.tasks)
  fromSchedules(jobs?.workflows)

  const autoRun = jobs?.autoRun
  if (Array.isArray(autoRun)) {
    for (const cron of autoRun as Array<{ queue?: unknown }>) add(cron.queue)
  }

  const processingOrder = jobs?.processingOrder as { queues?: Record<string, unknown> } | undefined
  if (processingOrder?.queues) {
    for (const name of Object.keys(processingOrder.queues)) add(name)
  }

  return [...queues].toSorted()
}

const queueParam = (queues: string[], ctx: BuildContext): ParameterObject => ({
  name: 'queue',
  in: 'query',
  description: makeT(ctx.i18n)('jobsQueue', { queues: queues.map((q) => `\`${q}\``).join(', ') }),
  schema: { type: 'string', enum: queues },
})

export const buildJobsPaths = ({ config, ctx }: { config: SanitizedConfig; ctx: BuildContext }): PathsObject => {
  const jobs = config.jobs as Record<string, unknown> | undefined
  const hasJobs = Boolean((jobs?.tasks as unknown[])?.length || (jobs?.workflows as unknown[])?.length)
  if (!hasJobs) return {}

  const t = makeT(ctx.i18n)
  const queue = queueParam(collectQueues(jobs), ctx)
  const errors = errorResponses(['401', '403', '500'], t)

  return {
    [`${ctx.apiRoute}/payload-jobs/run`]: {
      get: {
        tags: ['Jobs'],
        operationId: 'runJobs',
        summary: t('jobsRunSummary'),
        parameters: [
          queue,
          boolParam('allQueues', t('jobsRunAllQueues')),
          { name: 'limit', in: 'query', description: t('jobsLimit'), schema: { type: 'integer' } },
          boolParam('disableScheduling', t('jobsDisableScheduling')),
          boolParam('silent', t('jobsSilent')),
        ],
        responses: {
          '200': jsonResponse(t('jobsRunResult'), {
            type: 'object',
            properties: {
              message: { type: 'string' },
              noJobsRemaining: { type: 'boolean' },
              remainingJobsFromQueried: { type: 'integer' },
            },
          }),
          ...errors,
        },
      },
    },
    [`${ctx.apiRoute}/payload-jobs/handle-schedules`]: {
      get: {
        tags: ['Jobs'],
        operationId: 'handleJobSchedules',
        summary: t('jobsSchedulesSummary'),
        parameters: [queue, boolParam('allQueues', t('jobsSchedulesAllQueues'))],
        responses: {
          '200': jsonResponse(t('jobsSchedulesResult'), {
            type: 'object',
            properties: {
              message: { type: 'string' },
              queued: { type: 'integer' },
              errored: { type: 'integer' },
              skipped: { type: 'integer' },
            },
          }),
          ...errors,
        },
      },
    },
  }
}
