;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="b6814670-a3e8-190d-85d1-879cb8209aa1")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,820308,775159,e=>{"use strict";e.i(850036);var t,s,a=e.i(479084),r=e.i(55956),n=((t={}).API="api",t.STORAGE="storage",t.AUTH="auth",t.QUERY_PERFORMANCE="query_performance",t.DATABASE="database",t);e.s(["Presets",()=>n],775159);var i=e.i(562616),o=((s={}).LAST_10_MINUTES="Last 10 minutes",s.LAST_30_MINUTES="Last 30 minutes",s.LAST_60_MINUTES="Last 60 minutes",s.LAST_3_HOURS="Last 3 hours",s.LAST_24_HOURS="Last 24 hours",s.LAST_7_DAYS="Last 7 days",s.LAST_14_DAYS="Last 14 days",s.LAST_28_DAYS="Last 28 days",s);let l=[{text:"Last 10 minutes",calcFrom:()=>(0,r.default)().subtract(10,"minute").toISOString(),calcTo:()=>(0,r.default)().toISOString(),availableIn:["free","pro","team","enterprise","platform"]},{text:"Last 30 minutes",calcFrom:()=>(0,r.default)().subtract(30,"minute").toISOString(),calcTo:()=>(0,r.default)().toISOString(),availableIn:["free","pro","team","enterprise","platform"]},{text:"Last 60 minutes",calcFrom:()=>(0,r.default)().subtract(1,"hour").toISOString(),calcTo:()=>(0,r.default)().toISOString(),default:!0,availableIn:["free","pro","team","enterprise","platform"]},{text:"Last 3 hours",calcFrom:()=>(0,r.default)().subtract(3,"hour").toISOString(),calcTo:()=>(0,r.default)().toISOString(),availableIn:["free","pro","team","enterprise","platform"]},{text:"Last 24 hours",calcFrom:()=>(0,r.default)().subtract(1,"day").toISOString(),calcTo:()=>(0,r.default)().toISOString(),availableIn:["free","pro","team","enterprise","platform"]},{text:"Last 7 days",calcFrom:()=>(0,r.default)().subtract(7,"day").toISOString(),calcTo:()=>(0,r.default)().toISOString(),availableIn:["pro","team","enterprise"]},{text:"Last 14 days",calcFrom:()=>(0,r.default)().subtract(14,"day").toISOString(),calcTo:()=>(0,r.default)().toISOString(),availableIn:["team","enterprise"]},{text:"Last 28 days",calcFrom:()=>(0,r.default)().subtract(28,"day").toISOString(),calcTo:()=>(0,r.default)().toISOString(),availableIn:["team","enterprise"]}],c={iso_timestamp_start:l[0].calcFrom(),iso_timestamp_end:l[0].calcTo()};function d(e){return e.replace(/^WHERE/,"AND")}function u(e,t=!0){if(0===e.length)return i.safeSql``;let s=e.map(e=>{let t,s=e.key.split("."),a=[s[s.length-2],s[s.length-1]].join("."),r=e.key.includes(".")?a:e.key;try{t=(0,i.quotedIdent)(r)}catch{return null}let n=isNaN(Number(e.value))?(0,i.analyticsLiteral)(String(e.value)):(0,i.analyticsLiteral)(Number(e.value));switch(e.compare){case"matches":return i.safeSql`REGEXP_CONTAINS(${t}, ${n})`;case"is":default:return i.safeSql`${t} = ${n}`;case"!=":return i.safeSql`${t} != ${n}`;case">=":return i.safeSql`${t} >= ${n}`;case"<=":return i.safeSql`${t} <= ${n}`;case">":return i.safeSql`${t} > ${n}`;case"<":return i.safeSql`${t} < ${n}`}}).filter(e=>null!==e);if(0===s.length)return i.safeSql``;let a=(0,i.joinSqlFragments)(s," AND ");return t?i.safeSql`WHERE ${a}`:i.safeSql`AND ${a}`}let m={[n.API]:{title:"API",queries:{totalRequests:{queryType:"logs",safeSql:e=>i.safeSql`
        -- reports-api-total-requests
        select
          cast(timestamp_trunc(t.timestamp, hour) as datetime) as timestamp,
          count(t.id) as count
        FROM edge_logs t
          cross join unnest(metadata) as m
          cross join unnest(m.response) as response
          cross join unnest(m.request) as request
          cross join unnest(request.headers) as headers
          ${u(e)}
        GROUP BY
          timestamp
        ORDER BY
          timestamp ASC`},topRoutes:{queryType:"logs",safeSql:e=>i.safeSql`
        -- reports-api-top-routes
        select
          request.path as path,
          request.method as method,
          request.search as search,
          response.status_code as status_code,
          count(t.id) as count
        from edge_logs t
          cross join unnest(metadata) as m
          cross join unnest(m.response) as response
          cross join unnest(m.request) as request
          cross join unnest(request.headers) as headers
          ${u(e)}
        group by
          request.path, request.method, request.search, response.status_code
        order by
          count desc
        limit 10
        `},errorCounts:{queryType:"logs",safeSql:e=>i.safeSql`
        -- reports-api-error-counts
        select
          cast(timestamp_trunc(t.timestamp, hour) as datetime) as timestamp,
          count(t.id) as count
        FROM edge_logs t
          cross join unnest(metadata) as m
          cross join unnest(m.response) as response
          cross join unnest(m.request) as request
          cross join unnest(request.headers) as headers
        WHERE
          response.status_code >= 400
        ${u(e,!1)}
        GROUP BY
          timestamp
        ORDER BY
          timestamp ASC
        `},topErrorRoutes:{queryType:"logs",safeSql:e=>i.safeSql`
        -- reports-api-top-error-routes
        select
          request.path as path,
          request.method as method,
          request.search as search,
          response.status_code as status_code,
          count(t.id) as count
        from edge_logs t
          cross join unnest(metadata) as m
          cross join unnest(m.response) as response
          cross join unnest(m.request) as request
          cross join unnest(request.headers) as headers
        where
          response.status_code >= 400
        ${u(e,!1)}
        group by
          request.path, request.method, request.search, response.status_code
        order by
          count desc
        limit 10
        `},responseSpeed:{queryType:"logs",safeSql:e=>i.safeSql`
        -- reports-api-response-speed
        select
          cast(timestamp_trunc(t.timestamp, hour) as datetime) as timestamp,
          avg(response.origin_time) as avg
        FROM
          edge_logs t
          cross join unnest(metadata) as m
          cross join unnest(m.response) as response
          cross join unnest(m.request) as request
          cross join unnest(request.headers) as headers
          ${u(e)}
        GROUP BY
          timestamp
        ORDER BY
          timestamp ASC
      `},topSlowRoutes:{queryType:"logs",safeSql:e=>i.safeSql`
        -- reports-api-top-slow-routes
        select
          request.path as path,
          request.method as method,
          request.search as search,
          response.status_code as status_code,
          count(t.id) as count,
          avg(response.origin_time) as avg
        from edge_logs t
          cross join unnest(metadata) as m
          cross join unnest(m.response) as response
          cross join unnest(m.request) as request
          cross join unnest(request.headers) as headers
        ${u(e)}
        group by
          request.path, request.method, request.search, response.status_code
        order by
          avg desc
        limit 10
        `},networkTraffic:{queryType:"logs",safeSql:e=>i.safeSql`
        -- reports-api-network-traffic
        select
          cast(timestamp_trunc(t.timestamp, hour) as datetime) as timestamp,
          coalesce(
            safe_divide(
              sum(
                cast(coalesce(headers.content_length, "0") as int64)
              ),
              1000000
            ),
            0
          ) as ingress_mb,
          coalesce(
            safe_divide(
              sum(
                cast(coalesce(resp_headers.content_length, "0") as int64)
              ),
              1000000
            ),
            0
          ) as egress_mb,
        FROM
          edge_logs t
          cross join unnest(metadata) as m
          cross join unnest(m.response) as response
          cross join unnest(m.request) as request
          cross join unnest(request.headers) as headers
          cross join unnest(response.headers) as resp_headers
          ${u(e)}
        GROUP BY
          timestamp
        ORDER BY
          timestamp ASC
        `},requestsByCountry:{queryType:"logs",safeSql:e=>i.safeSql`
        -- reports-api-requests-by-country
        select
          cf.country as country,
          count(t.id) as count
        from edge_logs t
          cross join unnest(metadata) as m
          cross join unnest(m.response) as response
          cross join unnest(m.request) as request
          cross join unnest(request.headers) as headers
          cross join unnest(request.cf) as cf
        where
          cf.country is not null
        ${u(e,!1)}
        group by
          cf.country
        `}}},[n.AUTH]:{title:"",queries:{}},[n.STORAGE]:{title:"Storage",queries:{cacheHitRate:{queryType:"logs",safeSql:e=>i.safeSql`
        -- reports-storage-cache-hit-rate
SELECT
  timestamp_trunc(timestamp, hour) as timestamp,
  countif( h.cf_cache_status in ('HIT', 'STALE', 'REVALIDATED', 'UPDATING') ) as hit_count,
  countif( h.cf_cache_status in ('MISS', 'NONE/UNKNOWN', 'EXPIRED', 'BYPASS', 'DYNAMIC') ) as miss_count
from edge_logs f
  cross join unnest(f.metadata) as m
  cross join unnest(m.request) as r
  cross join unnest(m.response) as res
  cross join unnest(res.headers) as h
where starts_with(r.path, '/storage/v1/object') and r.method = 'GET'
  ${u(e,!1)}
group by timestamp
order by timestamp desc
`},topCacheMisses:{queryType:"logs",safeSql:e=>i.safeSql`
        -- reports-storage-top-cache-misses
SELECT
  r.path as path,
  r.search as search,
  count(id) as count
from edge_logs f
  cross join unnest(f.metadata) as m
  cross join unnest(m.request) as r
  cross join unnest(m.response) as res
  cross join unnest(res.headers) as h
where starts_with(r.path, '/storage/v1/object')
  and r.method = 'GET'
  and h.cf_cache_status in ('MISS', 'NONE/UNKNOWN', 'EXPIRED', 'BYPASS', 'DYNAMIC')
  ${u(e,!1)}
group by path, search
order by count desc
limit 12
    `}}},[n.QUERY_PERFORMANCE]:{title:"Query performance",queries:{mostFrequentlyInvoked:{queryType:"db",safeSql:(e,t,s,r=!1,n=!1)=>a.safeSql`
        -- reports-query-performance-most-frequently-invoked
set search_path to public, extensions;

select
    auth.rolname,
    statements.query,
    statements.calls,
    -- -- Postgres 13, 14, 15
    statements.total_exec_time + statements.total_plan_time as total_time,
    statements.min_exec_time + statements.min_plan_time as min_time,
    statements.max_exec_time + statements.max_plan_time as max_time,
    statements.mean_exec_time + statements.mean_plan_time as mean_time,
    -- -- Postgres <= 12
    -- total_time,
    -- min_time,
    -- max_time,
    -- mean_time,
    coalesce(statements.rows::numeric / nullif(statements.calls, 0), 0) as avg_rows,
    statements.rows as rows_read,
    case
      when (statements.shared_blks_hit + statements.shared_blks_read) > 0
      then round(
        (statements.shared_blks_hit * 100.0) /
        (statements.shared_blks_hit + statements.shared_blks_read),
        2
      )
      else 0
    end as cache_hit_rate${r?a.safeSql`,
    case
      when (lower(statements.query) like 'select%' or lower(statements.query) like 'with pgrst%')
      then (
        select json_build_object(
          'has_suggestion', array_length(index_statements, 1) > 0,
          'startup_cost_before', startup_cost_before,
          'startup_cost_after', startup_cost_after,
          'total_cost_before', total_cost_before,
          'total_cost_after', total_cost_after,
          'index_statements', index_statements
        )
        from index_advisor(statements.query)
      )
      else null
    end as index_advisor_result`:a.safeSql``}
  from pg_stat_statements as statements
    inner join pg_authid as auth on statements.userid = auth.oid
  -- skip queries that were never actually executed
  WHERE statements.calls > 0 ${t?d(t):a.safeSql``}
  ${s||a.safeSql`order by statements.calls desc`}
  limit 20`},mostTimeConsuming:{queryType:"db",safeSql:(e,t,s,r=!1,n=!1)=>a.safeSql`
        -- reports-query-performance-most-time-consuming
set search_path to public, extensions;

-- compute total time once up front so we don't need a window function over all rows
with grand_total as (
  select coalesce(nullif(sum(total_exec_time + total_plan_time), 0), 1) as v
  from pg_stat_statements where calls > 0
)
select
    auth.rolname,
    statements.query,
    statements.calls,
    statements.total_exec_time + statements.total_plan_time as total_time,
    statements.mean_exec_time + statements.mean_plan_time as mean_time,
    coalesce(
      ((statements.total_exec_time + statements.total_plan_time) /
        (select v from grand_total)) *
        100,
      0
    ) as prop_total_time${r?a.safeSql`,
    case
      when (lower(statements.query) like 'select%' or lower(statements.query) like 'with pgrst%')
      then (
        select json_build_object(
          'has_suggestion', array_length(index_statements, 1) > 0,
          'startup_cost_before', startup_cost_before,
          'startup_cost_after', startup_cost_after,
          'total_cost_before', total_cost_before,
          'total_cost_after', total_cost_after,
          'index_statements', index_statements
        )
        from index_advisor(statements.query)
      )
      else null
    end as index_advisor_result`:a.safeSql``}
  from pg_stat_statements as statements
    inner join pg_authid as auth on statements.userid = auth.oid
  -- skip queries that were never actually executed
  WHERE statements.calls > 0 ${t?d(t):a.safeSql``}
  ${s||a.safeSql`order by total_time desc`}
  limit 20`},slowestExecutionTime:{queryType:"db",safeSql:(e,t,s,r=!1,n=!1)=>a.safeSql`
        -- reports-query-performance-slowest-execution-time
set search_path to public, extensions;

select
    auth.rolname,
    statements.query,
    statements.calls,
    -- -- Postgres 13, 14, 15
    statements.total_exec_time + statements.total_plan_time as total_time,
    statements.min_exec_time + statements.min_plan_time as min_time,
    statements.max_exec_time + statements.max_plan_time as max_time,
    statements.mean_exec_time + statements.mean_plan_time as mean_time,
    -- -- Postgres <= 12
    -- total_time,
    -- min_time,
    -- max_time,
    -- mean_time,
    coalesce(statements.rows::numeric / nullif(statements.calls, 0), 0) as avg_rows${r?a.safeSql`,
    case
      when (lower(statements.query) like 'select%' or lower(statements.query) like 'with pgrst%')
      then (
        select json_build_object(
          'has_suggestion', array_length(index_statements, 1) > 0,
          'startup_cost_before', startup_cost_before,
          'startup_cost_after', startup_cost_after,
          'total_cost_before', total_cost_before,
          'total_cost_after', total_cost_after,
          'index_statements', index_statements
        )
        from index_advisor(statements.query)
      )
      else null
    end as index_advisor_result`:a.safeSql``}
  from pg_stat_statements as statements
    inner join pg_authid as auth on statements.userid = auth.oid
  -- skip queries that were never actually executed
  WHERE statements.calls > 0 ${t?d(t):a.safeSql``}
  ${s||a.safeSql`order by max_time desc`}
  limit 20`},queryHitRate:{queryType:"db",safeSql:e=>a.safeSql`-- reports-query-performance-cache-and-index-hit-rate
select
    'index hit rate' as name,
    (sum(idx_blks_hit)) / nullif(sum(idx_blks_hit + idx_blks_read),0) as ratio
  from pg_statio_user_indexes
  union all
  select
    'table hit rate' as name,
    sum(heap_blks_hit) / nullif(sum(heap_blks_hit) + sum(heap_blks_read),0) as ratio
  from pg_statio_user_tables;`},unified:{queryType:"db",safeSql:(e,t,s,r=!1,n=!1,i=1,o=20)=>{let l=(i-1)*o,c=n&&r?l+10*o:l+o,u=r?Math.min(c,500):c;return a.safeSql`
        -- reports-query-performance-unified
        set search_path to public, extensions;

        -- compute total time once up front so we don't need a window function over all rows
        with grand_total as (
          select coalesce(nullif(sum(total_exec_time + total_plan_time), 0), 1) as v
          from pg_stat_statements where calls > 0
        ),
        base as (
          select
            auth.rolname,
            statements.query,
            statements.calls,
            statements.total_exec_time + statements.total_plan_time as total_time,
            statements.min_exec_time + statements.min_plan_time as min_time,
            statements.max_exec_time + statements.max_plan_time as max_time,
            statements.mean_exec_time + statements.mean_plan_time as mean_time,
            coalesce(statements.rows::numeric / nullif(statements.calls, 0), 0) as avg_rows,
            statements.rows as rows_read,
            statements.shared_blks_hit as debug_hit,
            statements.shared_blks_read as debug_read,
            case
              when (statements.shared_blks_hit + statements.shared_blks_read) > 0
              then (statements.shared_blks_hit::numeric * 100.0) /
                   (statements.shared_blks_hit + statements.shared_blks_read)
              else 0
            end as cache_hit_rate,
            coalesce(
              ((statements.total_exec_time + statements.total_plan_time) /
                (select v from grand_total)) *
                100,
              0
            ) as prop_total_time
          from pg_stat_statements as statements
            inner join pg_authid as auth on statements.userid = auth.oid
          -- skip queries that were never actually executed
          WHERE statements.calls > 0 ${t?d(t):a.safeSql``}
          ${s||a.safeSql`order by total_time desc`}
          ${null!==u?a.safeSql`limit ${(0,a.literal)(u)}`:a.safeSql``}
        ),
        query_results as (
          select
            base.*${r?a.safeSql`,
            case
              when (lower(base.query) like 'select%' or lower(base.query) like 'with pgrst%')
              then (
                select json_build_object(
                  'has_suggestion', array_length(index_statements, 1) > 0,
                  'startup_cost_before', startup_cost_before,
                  'startup_cost_after', startup_cost_after,
                  'total_cost_before', total_cost_before,
                  'total_cost_after', total_cost_after,
                  'index_statements', index_statements
                )
                from index_advisor(base.query)
              )
              else null
            end as index_advisor_result`:a.safeSql``}
          from base
        )
        select *
        from query_results
        ${n&&r?a.safeSql`where (index_advisor_result->>'has_suggestion')::boolean = true`:a.safeSql``}
        ${s||a.safeSql`order by total_time desc`}
        limit ${(0,a.literal)(o)} offset ${(0,a.literal)(l)}`}},slowQueriesCount:{queryType:"db",safeSql:()=>a.safeSql`
        -- reports-query-performance-slow-queries-count
        set search_path to public, extensions;

        -- Count of slow queries (> 1 second average)
        SELECT count(*) as slow_queries_count
        -- alias needed to reference columns in WHERE
        FROM pg_stat_statements as statements
        -- skip never-executed queries; mean_exec_time > 1000ms = avg over 1 second
        WHERE statements.calls > 0 AND statements.mean_exec_time > 1000;`},queryMetrics:{queryType:"db",safeSql:(e,t,s,r=!1,n=!1)=>a.safeSql`
        -- reports-query-performance-metrics
        set search_path to public, extensions;

        SELECT
          COALESCE(ROUND(AVG(statements.rows::numeric / NULLIF(statements.calls, 0)), 1), 0) as avg_rows_per_call,
          COUNT(*) FILTER (WHERE statements.total_exec_time + statements.total_plan_time > 1000) as slow_queries,
          COALESCE(
            ROUND(
              SUM(statements.shared_blks_hit) * 100.0 /
              NULLIF(SUM(statements.shared_blks_hit + statements.shared_blks_read), 0),
              2
            ), 0
          ) || '%' as cache_hit_rate
        FROM pg_stat_statements as statements
        -- skip queries that were never actually executed
        WHERE statements.calls > 0 ${t?d(t):a.safeSql``}
        ${s||a.safeSql``}`}}},[n.DATABASE]:{title:"database",queries:{largeObjects:{queryType:"db",safeSql:e=>a.safeSql`-- reports-database-large-objects
SELECT
        SCHEMA_NAME,
        relname,
        table_size
      FROM
        (SELECT
          pg_catalog.pg_namespace.nspname AS SCHEMA_NAME,
          relname,
          pg_total_relation_size(pg_catalog.pg_class.oid) AS table_size
        FROM pg_catalog.pg_class
        JOIN pg_catalog.pg_namespace ON relnamespace = pg_catalog.pg_namespace.oid
        ) t
      WHERE SCHEMA_NAME NOT LIKE 'pg_%'
      ORDER BY table_size DESC
      LIMIT 5;`}}}};e.s(["BURSTABLE_IO_METRIC_KEYS",0,["disk_io_budget","disk_io_consumption"],"DEFAULT_QUERY_PARAMS",0,c,"DEPRECATED_REPORTS",0,["total_realtime_ingress","total_rest_options_requests","total_auth_ingress","total_auth_get_requests","total_auth_post_requests","total_auth_patch_requests","total_auth_options_requests","total_storage_options_requests","total_storage_patch_requests","total_options_requests","total_rest_ingress","total_rest_get_requests","total_rest_post_requests","total_rest_patch_requests","total_rest_delete_requests","total_storage_get_requests","total_storage_post_requests","total_storage_delete_requests","total_auth_delete_requests","total_get_requests","total_patch_requests","total_post_requests","total_ingress","total_delete_requests"],"EDGE_FUNCTION_REGIONS",0,[{key:"ap-northeast-1",label:"Tokyo"},{key:"ap-northeast-2",label:"Seoul"},{key:"ap-south-1",label:"Mumbai"},{key:"ap-southeast-1",label:"Singapore"},{key:"ap-southeast-2",label:"Sydney"},{key:"ca-central-1",label:"Canada Central"},{key:"us-east-1",label:"N. Virginia"},{key:"us-west-1",label:"N. California"},{key:"us-west-2",label:"Oregon"},{key:"eu-central-1",label:"Frankfurt"},{key:"eu-west-1",label:"Ireland"},{key:"eu-west-2",label:"London"},{key:"eu-west-3",label:"Paris"},{key:"sa-east-1",label:"São Paulo"}],"LAYOUT_COLUMN_COUNT",0,2,"PRESET_CONFIG",0,m,"REPORTS_DATEPICKER_HELPERS",0,l,"REPORT_DATERANGE_HELPER_LABELS",()=>o,"generateRegexpWhereSafe",0,u],820308)},610144,e=>{"use strict";e.i(850036);var t=e.i(53336),s=e.i(705541),a=e.i(964574),r=e.i(739114),n=e.i(667286),i=e.i(78162),o=e.i(617361);async function l({projectRef:e,connectionString:s,schema:a,name:r,version:n,cascade:i=!1,createSchema:c=!1}){let d=new Headers;s&&d.set("x-connection-encrypted",s);let u=(0,t.getEnableDatabaseExtensionSQL)({schema:a,name:r,version:n,cascade:i,createSchema:c}),{result:m}=await (0,o.executeSql)({projectRef:e,connectionString:s,sql:u,queryKey:["extension","create"]});return m}e.s(["useDatabaseExtensionEnableMutation",0,({onSuccess:e,onError:t,...o}={})=>{let c=(0,a.useQueryClient)();return(0,s.useMutation)({mutationFn:e=>l(e),async onSuccess(t,s,a){let{projectRef:r}=s;await Promise.all([c.invalidateQueries({queryKey:n.databaseExtensionsKeys.list(r)}),c.invalidateQueries({queryKey:i.configKeys.upgradeEligibility(r)})]),await e?.(t,s,a)},async onError(e,s,a){void 0===t?r.toast.error(`Failed to enable database extension: ${e.message}`):t(e,s,a)},...o})}])},888525,760255,284399,e=>{"use strict";e.i(850036);var t=e.i(479084),s=e.i(739114),a=e.i(617361),r=e.i(392491);function n(e=[]){return{hypopg:e.find(e=>"hypopg"===e.name),indexAdvisor:e.find(e=>"index_advisor"===e.name)}}async function i({projectRef:e,connectionString:r,indexStatements:n,onSuccess:o,onError:l}){if(!e){let e=Error("Project ref is required");return l&&l(e),Promise.reject(e)}if(0===n.length){let e=Error("No index statements provided");return l&&l(e),Promise.reject(e)}try{return await (0,a.executeSql)({projectRef:e,connectionString:r,sql:t.safeSql`${(0,t.joinSqlFragments)(n,";\n")};`}),s.toast.success("Successfully created index"),o&&o(),Promise.resolve()}catch(e){return s.toast.error(`Failed to create index: ${e.message}`),l&&l(e),Promise.reject(e)}}function o(e){return e&&0!==e.length?e.filter(e=>{let t=e.match(/ON\s+(?:"?(\w+)"?\.|(\w+)\.)/i);if(!t)return!0;let s=t[1]||t[2];return!s||!r.INTERNAL_SCHEMAS.includes(s.toLowerCase())}):[]}e.s(["calculateImprovement",0,function(e,t){if(void 0===e||void 0===t)return 0;let s=Number(e),a=Number(t);return s<=0||s<=a?0:(s-a)/s*100},"createIndexes",0,i,"filterProtectedSchemaIndexAdvisorResult",0,function(e){if(!e||!e.index_statements)return e??null;let t=o(e.index_statements);return 0===t.length?null:{...e,index_statements:t}},"filterProtectedSchemaIndexStatements",0,o,"getIndexAdvisorExtensions",0,n,"hasIndexRecommendations",0,function(e,t){return!!(t&&e?.index_statements&&e.index_statements.length>0)},"queryInvolvesProtectedSchemas",0,function(e){if(!e)return!1;let t=e.toLowerCase();return r.INTERNAL_SCHEMAS.some(e=>RegExp(`(?:from|join|update|insert\\s+into|delete\\s+from)\\s+(?:${e}\\.|"${e}"\\.)`,"i").test(t))}],760255);var l=e.i(450972),c=e.i(635494);e.s(["useIndexAdvisorStatus",0,function(){let{data:e}=(0,c.useSelectedProjectQuery)(),{data:t}=(0,l.useDatabaseExtensionsQuery)({projectRef:e?.ref,connectionString:e?.connectionString}),{hypopg:s,indexAdvisor:a}=n(t??[]),r=!!s&&!!a,i=r&&null!==s.installed_version&&null!==a.installed_version;return{isIndexAdvisorAvailable:r,isIndexAdvisorEnabled:i}}],888525);var d=e.i(221628),u=e.i(416340),m=e.i(232520),_=e.i(837710),p=e.i(610144),h=e.i(967052);let f=({open:e,setOpen:t})=>{let a=(0,h.useTrack)(),{data:r}=(0,c.useSelectedProjectQuery)(),{data:i}=(0,l.useDatabaseExtensionsQuery)({projectRef:r?.ref,connectionString:r?.connectionString}),{hypopg:o,indexAdvisor:u}=n(i),{mutateAsync:_,isPending:f}=(0,p.useDatabaseExtensionEnableMutation)(),x=async()=>{if(void 0===r)return s.toast.error("Project is required");try{o?.installed_version===null&&await _({projectRef:r?.ref,connectionString:r?.connectionString,name:o.name,schema:o?.schema??"extensions",version:o.default_version}),u?.installed_version===null&&await _({projectRef:r?.ref,connectionString:r?.connectionString,name:u.name,schema:u?.schema??"extensions",version:u.default_version}),s.toast.success("Successfully enabled Index Advisor!"),t(!1)}catch(e){throw s.toast.error(`Failed to enable Index Advisor: ${e.message}`),e}};return(0,d.jsx)(m.AlertDialog,{open:e,onOpenChange:()=>t(!e),children:(0,d.jsxs)(m.AlertDialogContent,{size:"small",children:[(0,d.jsxs)(m.AlertDialogHeader,{children:[(0,d.jsx)(m.AlertDialogTitle,{children:"Enable Index Advisor"}),(0,d.jsxs)(m.AlertDialogDescription,{className:"flex flex-col gap-y-2",children:[(0,d.jsx)("p",{children:"The Index Advisor recommends indexes to improve query performance on your tables based on your actual query patterns."}),(0,d.jsxs)("p",{children:["This will install the"," ",(0,d.jsx)("code",{className:"text-code-inline break-normal!",children:"index_advisor"})," and"," ",(0,d.jsx)("code",{className:"text-code-inline break-normal!",children:"hypopg"})," Postgres extensions so Index Advisor can analyse queries and suggest performance-improving indexes."]})]})]}),(0,d.jsxs)(m.AlertDialogFooter,{children:[(0,d.jsx)(m.AlertDialogCancel,{children:"Cancel"}),(0,d.jsx)(m.AlertDialogAction,{loading:f,onClick:()=>(a("index_advisor_enable_button_clicked",{origin:"dialog"}),x()),children:f?"Enabling...":"Enable"})]})]})})};e.s(["EnableIndexAdvisorButton",0,()=>{let e=(0,h.useTrack)(),[t,s]=(0,u.useState)(!1);return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(_.Button,{variant:"primary",onClick:()=>{s(!0),e("index_advisor_enable_button_clicked",{origin:"banner"})},children:"Enable"}),(0,d.jsx)(f,{open:t,setOpen:s})]})},"EnableIndexAdvisorDialog",0,f],284399)},749199,e=>{"use strict";var t=e.i(125356),s=e.i(820308),a=e.i(150671),r=e.i(617361),n=e.i(635494),i=e.i(10429),o=e.i(189329);e.s(["default",0,({sql:e,params:l=s.DEFAULT_QUERY_PARAMS,where:c,orderBy:d})=>{let{data:u}=(0,n.useSelectedProjectQuery)(),m=(0,o.useDatabaseSelectorStateSnapshot)(),{data:_}=(0,a.useReadReplicasQuery)({projectRef:u?.ref}),p=(_||[]).find(e=>e.identifier===m.selectedDatabaseId)?.connection_string_read_only,h=m.selectedDatabaseId,f=m.selectedDatabaseId&&m.selectedDatabaseId!==u?.ref?p:p??u?.connectionString,x="function"==typeof e?e([]):e,{data:g,error:y,isPending:b,isRefetching:q,refetch:S}=(0,t.useQuery)({queryKey:["projects",u?.ref,"db",{...l,sql:x,identifier:h,connectionString:f},c,d],queryFn:({signal:e})=>(0,r.executeSql)({projectRef:u?.ref,connectionString:f,sql:x},e).then(e=>e.result),enabled:!!x&&(!i.IS_PLATFORM||!!f),refetchOnWindowFocus:!1,refetchOnReconnect:!1});return{error:y||("object"==typeof g?g?.error:""),data:g,isLoading:b,isRefetching:q,params:l,runQuery:S,resolvedSql:x}}])},791759,e=>{"use strict";var t=e.i(416340);let s=t.forwardRef(function({title:e,titleId:s,...a},r){return t.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:r,"aria-labelledby":s},a),e?t.createElement("title",{id:s},e):null,t.createElement("path",{fillRule:"evenodd",d:"M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM9 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6.75 8a.75.75 0 0 0 0 1.5h.75v1.75a.75.75 0 0 0 1.5 0v-2.5A.75.75 0 0 0 8.25 8h-1.5Z",clipRule:"evenodd"}))});e.s(["InformationCircleIcon",0,s],791759)},764275,e=>{"use strict";e.s(["QUERY_PERFORMANCE_COLUMNS",0,[{id:"query",name:"Query",description:void 0,minWidth:450},{id:"prop_total_time",name:"Time consumed",description:void 0,minWidth:150},{id:"calls",name:"Calls",description:void 0,minWidth:100},{id:"max_time",name:"Max time",description:void 0,minWidth:100},{id:"mean_time",name:"Mean time",description:void 0,minWidth:100},{id:"min_time",name:"Min time",description:void 0,minWidth:100},{id:"rows_read",name:"Rows processed",description:void 0,minWidth:130},{id:"cache_hit_rate",name:"Cache hit rate",description:void 0,minWidth:130},{id:"rolname",name:"Role",description:void 0,minWidth:200},{id:"application_name",name:"Application",description:void 0,minWidth:150}],"QUERY_PERFORMANCE_PRESET_MAP",0,{most_time_consuming:"mostTimeConsuming",most_frequent:"mostFrequentlyInvoked",slowest_execution:"slowestExecutionTime",unified:"unified"},"QUERY_PERFORMANCE_ROLE_DESCRIPTION",0,[{name:"postgres",description:"The default Postgres role. This has admin privileges."},{name:"anon",description:"For unauthenticated, public access. This is the role which the API (PostgREST) will use when a user is not logged in."},{name:"authenticator",description:'A special role for the API (PostgREST). It has very limited access, and is used to validate a JWT and then "change into" another role determined by the JWT verification.'},{name:"authenticated",description:'For "authenticated access." This is the role which the API (PostgREST) will use when a user is logged in.'},{name:"service_role",description:"For elevated access. This role is used by the API (PostgREST) to bypass Row Level Security."},{name:"supabase_auth_admin",description:"Used by the Auth middleware to connect to the database and run migration. Access is scoped to the auth schema."},{name:"supabase_storage_admin",description:"Used by the Auth middleware to connect to the database and run migration. Access is scoped to the storage schema."},{name:"dashboard_user",description:"For running commands via the Supabase UI."},{name:"supabase_admin",description:"An internal role Supabase uses for administrative tasks, such as running upgrades and automations."},{name:"pgbouncer",description:"PgBouncer is a lightweight connection pooler for PostgreSQL. Available on paid plans only."}]])},769105,e=>{"use strict";e.i(850036);var t=e.i(479084),s=e.i(793041),a=e.i(964574),r=e.i(820308),n=e.i(775159),i=e.i(150671),o=e.i(617361),l=e.i(749199),c=e.i(635494),d=e.i(10429),u=e.i(189329);let m=new Set(["query","rolname","total_time","prop_total_time","calls","avg_rows","max_time","mean_time","min_time"]);function _({preset:e,orderBy:s,searchQuery:a="",roles:i=[],sources:o=[],minCalls:l=0,minTotalTime:c=0,runIndexAdvisor:d=!1,filterIndexAdvisor:u=!1,page:p=1,pageSize:h=20}){let f=Number.isFinite(p)?Math.max(1,Math.floor(p)):1,x=Number.isFinite(h)?Math.min(Math.max(1,Math.floor(h)),100):20,g=r.PRESET_CONFIG[n.Presets.QUERY_PERFORMANCE].queries[e],y=null!=s&&m.has(s.column)&&("asc"===s.order||"desc"===s.order)?t.safeSql`ORDER BY ${(0,t.ident)(s.column)} ${(0,t.keyword)(s.order)}`:void 0,b=[];i.length>0&&b.push(t.safeSql`auth.rolname in (${(0,t.joinSqlFragments)(i.map(e=>(0,t.literal)(e)),", ")})`),a.length>0&&b.push(t.safeSql`statements.query ~* ${(0,t.literal)(a)}`),o.includes("dashboard")&&!o.includes("non-dashboard")&&b.push(t.safeSql`statements.query ~* 'source: dashboard'`),o.includes("non-dashboard")&&!o.includes("dashboard")&&b.push(t.safeSql`statements.query !~* 'source: dashboard'`),Number.isFinite(l)&&l>0&&b.push(t.safeSql`statements.calls >= ${(0,t.literal)(l)}`),Number.isFinite(c)&&c>0&&b.push(t.safeSql`(statements.total_exec_time + statements.total_plan_time) >= ${(0,t.literal)(c)}`);let q=(0,t.joinSqlFragments)(b," AND ");if("db"!==g.queryType)throw Error(`Query performance presets must be db queries; got ${g.queryType} for preset ${e}`);return{sql:g.safeSql([],q.length>0?t.safeSql`WHERE ${q}`:void 0,y,d,u,f,x),whereSql:q,orderBySql:y}}e.s(["useQueryPerformanceInfiniteQuery",0,e=>{let t=(0,a.useQueryClient)(),{data:r}=(0,c.useSelectedProjectQuery)(),n=(0,u.useDatabaseSelectorStateSnapshot)(),{data:l}=(0,i.useReadReplicasQuery)({projectRef:r?.ref}),m=(l||[]).find(e=>e.identifier===n.selectedDatabaseId)?.connection_string_read_only,p=e.pageSize,h=Number.isFinite(p)?Math.min(Math.max(1,Math.floor(p)),100):20,{sql:f}=_({...e,page:1,pageSize:h}),x=n.selectedDatabaseId&&n.selectedDatabaseId!==r?.ref?m:m??r?.connectionString,{data:g,isPending:y,isRefetching:b,isFetchingNextPage:q,hasNextPage:S,error:v,fetchNextPage:j}=(0,s.useInfiniteQuery)({queryKey:["projects",r?.ref,"query-performance-infinite",{...e,pageSize:h,identifier:n.selectedDatabaseId,connectionString:x}],initialPageParam:1,queryFn:({pageParam:t,signal:s})=>{let{sql:a}=_({...e,page:t,pageSize:h});return(0,o.executeSql)({projectRef:r?.ref,connectionString:x,sql:a},s).then(e=>e.result)},getNextPageParam:(e,t)=>e.length<h?void 0:t.length+1,enabled:!!r?.ref&&(!d.IS_PLATFORM||!!x),refetchOnWindowFocus:!1,refetchOnReconnect:!1});return{data:g?.pages.flatMap(e=>e)??void 0,isLoading:y,isRefetching:b,isFetchingNextPage:q,hasNextPage:S??!1,error:v,fetchNextPage:j,refetch:()=>t.resetQueries({queryKey:["projects",r?.ref,"query-performance-infinite"],exact:!1}),resolvedSql:f}},"useQueryPerformanceQuery",0,e=>{let{sql:t,whereSql:s,orderBySql:a}=_(e);return(0,l.default)({sql:t,params:void 0,where:s,orderBy:a})}])},713491,e=>{"use strict";e.s(["useIndexInvalidation",()=>m]);var t=e.i(964574),s=e.i(183808),a=e.i(871569),r=e.i(416340),n=e.i(764275),i=e.i(769105),o=e.i(888525),l=e.i(826843),c=e.i(937357),d=e.i(246230),u=e.i(635494);function m(){let e=(0,s.useRouter)(),m=(0,t.useQueryClient)(),{data:_}=(0,u.useSelectedProjectQuery)(),{isIndexAdvisorEnabled:p}=(0,o.useIndexAdvisorStatus)(),[{preset:h,search:f,order:x,sort:g}]=(0,a.useQueryStates)({sort:a.parseAsString,search:a.parseAsString.withDefault(""),order:a.parseAsString,preset:a.parseAsString.withDefault("unified")}),{invalidate:y}=(0,l.useTableIndexAdvisor)(),b=n.QUERY_PERFORMANCE_PRESET_MAP[h],q=e?.query?.roles??[],S=(0,i.useQueryPerformanceQuery)({searchQuery:f,orderBy:g?{column:g,order:x}:void 0,preset:b,roles:"string"==typeof q?[q]:q,runIndexAdvisor:p});return(0,r.useCallback)(()=>{S.runQuery(),m.invalidateQueries({queryKey:d.databaseKeys.indexAdvisorFromQuery(_?.ref,"")}),m.invalidateQueries({queryKey:c.databaseIndexesKeys.list(_?.ref)}),y()},[S,m,_?.ref,y])}},961563,593977,e=>{"use strict";var t=e.i(221628);e.i(128328);var s=e.i(158639),a=e.i(640040),r=e.i(739114),n=e.i(93558),i=e.i(837710),o=e.i(592383),l=e.i(760255),c=e.i(450346),d=e.i(513826),u=e.i(610144),m=e.i(450972),_=e.i(635494),p=e.i(10429);e.s(["IndexAdvisorDisabledState",0,()=>{let{ref:e}=(0,s.useParams)(),{data:h}=(0,_.useSelectedProjectQuery)(),{data:f}=(0,m.useDatabaseExtensionsQuery)({projectRef:h?.ref,connectionString:h?.connectionString}),{hypopg:x,indexAdvisor:g}=(0,l.getIndexAdvisorExtensions)(f),{mutateAsync:y,isPending:b}=(0,u.useDatabaseExtensionEnableMutation)(),q=async()=>{if(void 0===h)return console.error("Project is required");try{x?.installed_version===null&&await y({projectRef:h?.ref,connectionString:h?.connectionString,name:x.name,schema:x?.schema??"extensions",version:x.default_version}),g?.installed_version===null&&await y({projectRef:h?.ref,connectionString:h?.connectionString,name:g.name,schema:g?.schema??"extensions",version:g.default_version}),r.toast.success("Successfully enabled index advisor!")}catch(e){r.toast.error(`Failed to enable index advisor: ${e.message}`)}};return(0,t.jsxs)(n.Alert,{className:"mb-6",children:[(0,t.jsx)(n.AlertTitle,{children:(0,t.jsx)(o.Markdown,{className:"text-foreground",content:void 0===g?"Newer version of Postgres required":"Postgres extensions `index_advisor` and `hypopg` required"})}),(0,t.jsx)(n.AlertDescription,{children:(0,t.jsx)(o.Markdown,{content:void 0===g?"Upgrade to the latest version of Postgres to get recommendations on indexes for your queries":"These extensions can help in recommending database indexes to reduce the costs of your query."})}),(0,t.jsx)(n.AlertDescription,{className:"mt-3",children:(0,t.jsxs)("div",{className:"flex items-center gap-x-2",children:[void 0===g?(0,t.jsx)(i.Button,{asChild:!0,variant:"default",children:(0,t.jsx)(a.default,{href:(0,c.getServiceVersionsPath)(e),children:"Upgrade Postgres version"})}):(0,t.jsx)(i.Button,{variant:"default",disabled:b,loading:b,onClick:()=>q(),children:"Enable extensions"}),(0,t.jsx)(d.DocsButton,{href:`${p.DOCS_URL}/guides/database/extensions/index_advisor`})]})})]})}],961563);var h=e.i(843778);e.s(["IndexImprovementText",0,({indexStatements:e,totalCostBefore:s,totalCostAfter:a,className:r,...n})=>{let i=(0,l.calculateImprovement)(s,a);return(0,t.jsxs)("p",{className:(0,h.cn)("text-sm text-foreground-light mb-3",r),...n,children:["Query's performance can be improved by"," ",(0,t.jsxs)("span",{className:"text-brand",children:[i.toFixed(2),"%"]})," by creating this"," ",e.length>1?"indexes":"index",":"]})}],593977)},770235,e=>{"use strict";var t=e.i(221628),s=e.i(791759),a=e.i(323502),r=e.i(146628),n=e.i(843778),i=e.i(613580);e.s(["QueryPanelContainer",0,({children:e,className:s})=>(0,t.jsx)("div",{className:(0,n.cn)("flex flex-col gap-y-0 py-4",s),children:e}),"QueryPanelScoreSection",0,({className:e,name:o,description:l,before:c,after:d,hideArrowMarkers:u=!1})=>{let m=void 0!==c?Number(c):void 0,_=void 0!==d?Number(d):void 0;return(0,t.jsxs)("div",{className:(0,n.cn)("py-4 px-4 flex",e),children:[(0,t.jsxs)("div",{className:"flex gap-x-2 w-48",children:[(0,t.jsx)("span",{className:"text-sm",children:o}),(0,t.jsxs)(i.Tooltip,{children:[(0,t.jsx)(i.TooltipTrigger,{asChild:!0,className:"mt-1",children:(0,t.jsx)(s.InformationCircleIcon,{className:"transition text-foreground-muted w-3 h-3 data-[state=delayed-open]:text-foreground-light"})}),(0,t.jsx)(i.TooltipContent,{side:"top",className:"w-52 text-center",children:l})]})]}),(0,t.jsxs)("div",{className:"flex flex-col gap-y-1",children:[(0,t.jsxs)("div",{className:"flex gap-x-2 text-sm",children:[(0,t.jsx)("span",{className:"text-foreground-light w-20",children:"Currently:"}),(0,t.jsx)("span",{className:(0,n.cn)("font-mono",void 0!==m&&void 0!==_&&m!==_?"text-foreground-light":""),children:m})]}),void 0!==m&&void 0!==_&&m!==_&&(0,t.jsxs)("div",{className:"flex items-center gap-x-2 text-sm",children:[(0,t.jsx)("span",{className:"text-foreground-light w-20",children:"With index:"}),(0,t.jsx)("span",{className:"font-mono",children:_}),void 0!==m&&!u&&(0,t.jsxs)("div",{className:"flex items-center gap-x-1",children:[_>m?(0,t.jsx)(r.ArrowUp,{size:14,className:"text-warning"}):(0,t.jsx)(a.ArrowDown,{size:14,className:"text-brand"}),0!==m&&!isNaN(m)&&isFinite(m)&&(0,t.jsxs)("span",{className:(0,n.cn)("font-mono tracking-tighter",_>m?"text-warning":"text-brand"),children:[((m-_)/m*100).toFixed(2),"%"]})]})]})]})]})},"QueryPanelSection",0,({children:e,className:s})=>(0,t.jsx)("div",{className:(0,n.cn)("px-6 flex flex-col gap-y-0",s),children:e})])},849368,e=>{"use strict";var t=e.i(479084),s=e.i(125356),a=e.i(97429),r=e.i(246230),n=e.i(760255),i=e.i(617361);let o=a.z.object({errors:a.z.array(a.z.string()),index_statements:a.z.array(a.z.string()),startup_cost_before:a.z.number().nullable().transform(e=>e??0),startup_cost_after:a.z.number().nullable().transform(e=>e??0),total_cost_before:a.z.number().nullable().transform(e=>e??0),total_cost_after:a.z.number().nullable().transform(e=>e??0)});async function l({projectRef:e,connectionString:s,query:a}){if(!e)throw Error("Project ref is required");let{result:r}=await (0,i.executeSql)({projectRef:e,connectionString:s,sql:t.safeSql`set search_path to public, extensions; select * from index_advisor(${(0,t.literal)(a)});`});if(!r||0===r.length)return console.error("[index_advisor > getIndexAdvisorResult] No results from index_advisor"),null;let c=o.safeParse(r[0]);if(!c.success){let e=c.error.errors[0],t=e.path.length>0?` at path: ${e.path.join(".")}`:"";return console.error(`Invalid index advisor response${t}: ${e.message}. Received: ${JSON.stringify(r[0])}`),null}return(0,n.filterProtectedSchemaIndexAdvisorResult)(c.data)}e.s(["getIndexAdvisorResult",0,l,"useGetIndexAdvisorResult",0,({projectRef:e,connectionString:t,query:a},{enabled:n=!0,...i}={})=>{let o=(a??"").trim().toLowerCase(),c=o.startsWith("select")||o.startsWith("with pgrst_source");return(0,s.useQuery)({queryKey:r.databaseKeys.indexAdvisorFromQuery(e,a),queryFn:()=>l({projectRef:e,connectionString:t,query:a}),retry:!1,enabled:n&&void 0!==e&&void 0!==a&&c,...i})}])},331906,e=>{"use strict";e.s(["QueryIndexes",()=>C],331906);var t=e.i(221628),s=e.i(350046),a=e.i(312062),r=e.i(790792),n=e.i(416340),i=e.i(93558),o=e.i(837710),l=e.i(843778),c=e.i(348534),d=e.i(911735),u=e.i(331162),m=e.i(108151),_=e.i(713491),p=e.i(284399),h=e.i(760255),f=e.i(961563),x=e.i(593977),g=e.i(770235),y=e.i(888525),b=e.i(567558),q=e.i(513826),S=e.i(450972),v=e.i(849368),j=e.i(479084),E=e.i(125356),w=e.i(246230),A=e.i(617361);async function N({projectRef:e,connectionString:t,query:s}){if(!e)throw Error("Project ref is required");try{var a;let r,{result:n}=await (0,A.executeSql)({projectRef:e,connectionString:t,queryKey:["involved-indexes-explain-query"],sql:j.safeSql`
        create or replace function pg_temp.explain_query(query text) returns jsonb
        language plpgsql
        as $$
        declare
            explain_result jsonb;
            prepared_statement_name text := 'query_to_explain';
            explain_plan_statement text;
            n_args int;
        begin
            -- Remove comment lines (its common that they contain semicolons)
            query := trim(
                regexp_replace(
                    regexp_replace(
                        regexp_replace(query,'\\/\\*.+\\*\\/', '', 'g'),
                    '--[^\\r\\n]*', ' ', 'g'),
                '\\s+', ' ', 'g')
            );
      
            -- Remove trailing semicolon
            query := regexp_replace(query, ';\\s*$', '');

            -- Disallow multiple statements
            if query ilike '%;%' then
                raise exception 'Query must not contain a semicolon';
            end if;
        
            -- Hack to support PostgREST because the prepared statement for args incorrectly defaults to text
            query := replace(query, 'WITH pgrst_payload AS (SELECT $1 AS json_data)', 
                                    'WITH pgrst_payload AS (SELECT $1::json AS json_data)');
        
            -- Create a prepared statement for the given query
            deallocate all;
            execute format('prepare %I as %s', prepared_statement_name, query);
        
            -- Detect how many arguments are present in the prepared statement
            n_args = (
                select
                    coalesce(array_length(parameter_types, 1), 0)
                from
                    pg_prepared_statements
                where
                    name = prepared_statement_name
                limit
                    1
            );
        
            -- Create a SQL statement that can be executed to collect the explain plan
            explain_plan_statement = format(
                'set local plan_cache_mode = force_generic_plan; explain (format json) execute %I%s',
                prepared_statement_name,
                case
                    when n_args = 0 then ''
                    else format(
                        '(%s)', array_to_string(array_fill('null'::text, array[n_args]), ',')
                    )
                end
            );
        
            -- Execute the explain plan statement and get the result
            execute explain_plan_statement into explain_result;
        
            -- Clean up the prepared statement
            deallocate all;
        
            -- Return the explain result
            return explain_result;
        end;
        $$;

        select pg_temp.explain_query(${(0,j.literal)(s)}) as plans;
      `}),i=(a=n,r=[],!function e(t){null!==t&&"object"==typeof t&&("Index Name"in t&&r.push(t["Index Name"]),Object.values(t).forEach(t=>e(t)))}(a),r);if(i.length<=0)return[];let{result:o}=await (0,A.executeSql)({projectRef:e,connectionString:t,queryKey:["involved-indexes-names"],sql:j.safeSql`select schemaname as schema, tablename as table, indexname as name from pg_indexes where indexname in (${(0,j.joinSqlFragments)(i.map(j.literal),", ")});`});return o}catch(e){return[]}}var R=e.i(635494),I=e.i(10429),T=e.i(967052);let C=({selectedRow:e,columnName:j,suggestedSelectQuery:A,prefetchedIndexAdvisorResult:C,onClose:P})=>{let{data:k}=(0,R.useSelectedProjectQuery)(),[$,O]=(0,n.useState)(!1),[L,F]=(0,n.useState)(!1),Q=(0,T.useTrack)(),[D,M]=(0,n.useState)(!1),{data:U,isSuccess:W,isPending:B,isError:z,error:H}=(({projectRef:e,connectionString:t,query:s},{enabled:a=!0,...r}={})=>{let n=(s??"").trim().toLowerCase(),i=n.startsWith("select")||n.startsWith("with pgrst_source")||n.startsWith("with pgrst_payload");return(0,E.useQuery)({queryKey:w.databaseKeys.indexesFromQuery(e,s),queryFn:()=>N({projectRef:e,connectionString:t,query:s}),retry:!1,enabled:a&&void 0!==e&&void 0!==s&&i,...r})})({projectRef:k?.ref,connectionString:k?.connectionString,query:e?.query}),{isPending:K}=(0,S.useDatabaseExtensionsQuery)({projectRef:k?.ref,connectionString:k?.connectionString}),{isIndexAdvisorEnabled:Y}=(0,y.useIndexAdvisorStatus)(),G=void 0!==C,{data:V,error:J,refetch:X,isError:Z,isSuccess:ee,isLoading:et}=(0,v.useGetIndexAdvisorResult)({projectRef:k?.ref,connectionString:k?.connectionString,query:e?.query},{enabled:Y&&!G}),es=G?C:V,ea=G||ee,er=!G&&et,{index_statements:en,startup_cost_after:ei,startup_cost_before:eo,total_cost_after:el,total_cost_before:ec}=es??{index_statements:[],total_cost_after:0,total_cost_before:0},ed=(0,h.hasIndexRecommendations)(es,ea);(0,h.calculateImprovement)(ec,el);let eu=(0,_.useIndexInvalidation)();(0,n.useEffect)(()=>{er||D||(Q("index_advisor_tab_clicked",{hasRecommendations:ed,isIndexAdvisorEnabled:Y}),M(!0))},[er,ed,D,Q,Y]);let em=async()=>{if(0!==en.length){F(!0),Q("index_advisor_create_indexes_button_clicked");try{await (0,h.createIndexes)({projectRef:k?.ref,connectionString:k?.connectionString,indexStatements:en,onSuccess:()=>X()}),eu()}catch(e){console.error("Failed to create index:",e),F(!1)}finally{F(!1),P?.()}}};return K||Y?(0,t.jsxs)(g.QueryPanelContainer,{className:"h-full overflow-y-auto py-0 pt-4",children:[(j||A)&&(0,t.jsx)(g.QueryPanelSection,{className:"pt-2 pb-6 border-b",children:(0,t.jsxs)("div",{className:"flex flex-col gap-y-3",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h4",{className:"mb-2",children:"Recommendation reason"}),j&&(0,t.jsxs)("p",{className:"text-sm text-foreground-light",children:["Recommendation for column: ",(0,t.jsx)("span",{className:"font-mono",children:j})]})]}),A&&(0,t.jsxs)("div",{className:"flex flex-col gap-y-4",children:[(0,t.jsx)("p",{className:"text-sm text-foreground-light",children:"Based on the following query:"}),(0,t.jsx)(u.CodeBlock,{hideLineNumbers:!0,value:A,language:"sql",className:(0,l.cn)("max-w-full max-h-[200px]","py-2! px-2.5! prose dark:prose-dark","[&>code]:m-0 [&>code>span]:flex [&>code>span]:flex-wrap")})]})]})}),(0,t.jsxs)(g.QueryPanelSection,{className:(0,l.cn)("mb-6",A||j?"pt-6":"pt-2"),children:[(0,t.jsxs)("div",{className:"mb-4 flex flex-col gap-y-1",children:[(0,t.jsx)("h4",{className:"mb-2",children:"Indexes in use"}),(0,t.jsxs)("p",{className:"text-sm text-foreground-light",children:["This query is using the following index",(U??[]).length>1?"s":"",":"]})]}),B&&(0,t.jsx)(m.GenericSkeletonLoader,{}),z&&(0,t.jsx)(b.AlertError,{projectRef:k?.ref,error:H,subject:"Failed to retrieve indexes in use"}),W&&(0,t.jsxs)("div",{children:[0===U.length&&(0,t.jsxs)("div",{className:"border rounded-sm border-dashed flex flex-col items-center justify-center py-4 px-12 gap-y-1 text-center",children:[(0,t.jsx)("p",{className:"text-sm text-foreground-light",children:"No indexes are involved in this query"}),(0,t.jsx)("p",{className:"text-center text-xs text-foreground-lighter",children:"Indexes may not necessarily be used if they incur a higher cost when executing the query"})]}),U.map(e=>(0,t.jsxs)("div",{className:"flex items-center gap-x-4 bg-surface-100 border first:rounded-tl first:rounded-tr border-b-0 last:border-b last:rounded-b px-2 py-2",children:[(0,t.jsxs)("div",{className:"flex items-center gap-x-2",children:[(0,t.jsx)(r.Table2,{size:14,className:"text-foreground-light"}),(0,t.jsxs)("span",{className:"text-xs font-mono text-foreground-light",children:[e.schema,".",e.table]})]}),(0,t.jsx)("span",{className:"text-xs font-mono",children:e.name})]},e.name))]})]}),(0,t.jsx)(g.QueryPanelSection,{className:"flex flex-col gap-y-6 py-6 border-t",children:(0,t.jsxs)("div",{className:"flex flex-col gap-y-1",children:[(!ea||null!==es)&&(0,t.jsx)("h4",{className:"mb-2",children:"New index recommendations"}),K?(0,t.jsx)(m.GenericSkeletonLoader,{}):Y?(0,t.jsxs)(t.Fragment,{children:[er&&(0,t.jsx)(m.GenericSkeletonLoader,{}),Z&&(0,t.jsx)(b.AlertError,{projectRef:k?.ref,error:J,subject:"Failed to retrieve result from index advisor"}),ea&&(0,t.jsx)(t.Fragment,{children:null===es?(0,t.jsx)(d.Admonition,{type:"default",showIcon:!0,title:"Index recommendations not available",description:"Index advisor could not analyze this query. This can happen if the query references tables, functions, or extensions that no longer exist or were deleted."}):0===(en??[]).length?(0,t.jsxs)(i.Alert,{className:"[&>svg]:rounded-full",children:[(0,t.jsx)(a.Check,{}),(0,t.jsx)(i.AlertTitle,{children:"This query is optimized"}),(0,t.jsx)(i.AlertDescription,{children:"Recommendations for indexes will show here"})]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(x.IndexImprovementText,{indexStatements:en,totalCostBefore:ec,totalCostAfter:el,className:"text-sm text-foreground-light"}),(0,t.jsx)(u.CodeBlock,{hideLineNumbers:!0,value:en.join(";\n")+";",language:"sql",className:(0,l.cn)("max-w-full max-h-[310px]","py-3! px-3.5! prose dark:prose-dark transition","[&>code]:m-0 [&>code>span]:flex [&>code>span]:flex-wrap")}),(0,t.jsx)("p",{className:"text-sm text-foreground-light mt-3",children:"This recommendation serves to prevent your queries from slowing down as your application grows, and hence the index may not be used immediately after it's created (e.g If your table is still small at this time)."})]})})]}):(0,t.jsx)(f.IndexAdvisorDisabledState,{})]})}),Y&&ed&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(g.QueryPanelSection,{className:"py-6 border-t",children:(0,t.jsxs)("div",{className:"flex flex-col gap-y-1",children:[(0,t.jsx)("h4",{className:"mb-2",children:"Query costs"}),(0,t.jsxs)("div",{className:"border rounded-md flex flex-col bg-surface-100",children:[(0,t.jsx)(g.QueryPanelScoreSection,{name:"Total cost of query",description:"An estimate of how long it will take to return all the rows (Includes start up cost)",before:ec,after:el}),(0,t.jsxs)(c.Collapsible,{open:$,onOpenChange:O,children:[(0,t.jsx)(c.CollapsibleContent,{asChild:!0,className:"pb-3",children:(0,t.jsx)(g.QueryPanelScoreSection,{hideArrowMarkers:!0,className:"border-t",name:"Start up cost",description:"An estimate of how long it will take to fetch the first row",before:eo,after:ei})}),(0,t.jsxs)(c.CollapsibleTrigger,{className:"text-xs py-1.5 border-t text-foreground-light bg-studio w-full rounded-b-md",children:["View ",$?"less":"more"]})]})]})]})}),(0,t.jsx)(g.QueryPanelSection,{className:"py-6 border-t",children:(0,t.jsxs)("div",{className:"flex flex-col gap-y-2",children:[(0,t.jsx)("h4",{className:"mb-2",children:"FAQ"}),(0,t.jsxs)(s.Accordion,{collapsible:!0,type:"single",className:"border rounded-md",children:[(0,t.jsxs)(s.AccordionItem,{value:"1",children:[(0,t.jsx)(s.AccordionTrigger,{className:"px-4 py-3 text-sm font-normal text-foreground-light hover:text-foreground transition data-open:text-foreground",children:"What units are cost in?"}),(0,t.jsx)(s.AccordionContent,{className:"px-4 text-foreground-light",children:"Costs are in an arbitrary unit, and do not represent a unit of time. The units are anchored (by default) to a single sequential page read costing 1.0 units. They do, however, serve as a predictor of higher execution times."})]}),(0,t.jsxs)(s.AccordionItem,{value:"2",className:"border-b-0",children:[(0,t.jsx)(s.AccordionTrigger,{className:"px-4 py-3 text-sm font-normal text-foreground-light hover:text-foreground transition data-open:text-foreground",children:"How should I prioritize start up and total cost?"}),(0,t.jsxs)(s.AccordionContent,{className:"px-4 text-foreground-light [&>div]:space-y-2",children:[(0,t.jsx)("p",{children:"This depends on the expected size of the result set from the query."}),(0,t.jsx)("p",{children:"For queries that return a small number or rows, the startup cost is more critical and minimizing startup cost can lead to faster response times, especially in interactive applications."}),(0,t.jsx)("p",{children:"For queries that return a large number of rows, the total cost becomes more important, and optimizing it will help in efficiently using resources and reducing overall query execution time."})]})]})]})]})})]}),Y&&ed&&(0,t.jsxs)("div",{className:"bg-studio sticky bottom-0 border-t py-3 flex items-center justify-between px-5",children:[(0,t.jsxs)("div",{className:"flex flex-col gap-y-0.5 text-xs",children:[(0,t.jsx)("span",{children:"Apply index to database"}),(0,t.jsx)("span",{className:"text-xs text-foreground-light",children:"This will run the SQL that is shown above"})]}),(0,t.jsx)(o.Button,{disabled:L,loading:L,variant:"primary",onClick:()=>em(),children:"Create index"})]})]}):(0,t.jsx)(g.QueryPanelContainer,{className:"h-full",children:(0,t.jsx)(g.QueryPanelSection,{className:"pt-2",children:(0,t.jsxs)("div",{className:"border rounded-sm border-dashed flex flex-col items-center justify-center py-4 px-12 gap-y-1 text-center",children:[(0,t.jsx)("p",{className:"text-sm text-foreground-light",children:"Enable Index Advisor"}),(0,t.jsx)("p",{className:"text-center text-xs text-foreground-lighter mb-2",children:"Recommends indexes to improve query performance."}),(0,t.jsxs)("div",{className:"flex items-center gap-x-2",children:[(0,t.jsx)(q.DocsButton,{href:`${I.DOCS_URL}/guides/database/extensions/index_advisor`}),(0,t.jsx)(p.EnableIndexAdvisorButton,{})]})]})})})}},826843,e=>{"use strict";e.s(["TableIndexAdvisorProvider",()=>f,"useColumnHasIndexSuggestion",()=>g,"useTableIndexAdvisor",()=>x],826843);var t=e.i(221628),s=e.i(964574),a=e.i(416340),r=e.i(725137),n=e.i(888525),i=e.i(331906),o=e.i(246230);e.i(850036);var l=e.i(479084),c=e.i(125356),d=e.i(760255),u=e.i(617361);function m(e){return e.trim().replace(/\s+(asc|desc)(\s+nulls\s+(first|last))?$/i,"").replace(/\s+nulls\s+(first|last)$/i,"").trim().replace(/^"(.+)"$/,"$1")}async function _({projectRef:e,connectionString:t,schema:s,table:a}){let r,n,i,o,c;if(!e)throw Error("Project ref is required");if(!s)throw Error("Schema is required");if(!a)throw Error("Table is required");let p=(r=s.toLowerCase().replace(/[.+*?^${}()|[\]\\]/g,"\\$&"),n=a.toLowerCase().replace(/[.+*?^${}()|[\]\\]/g,"\\$&"),i=(0,l.literal)(`(^|[^a-z0-9_$])${r}[.]${n}($|[^a-z0-9_$])`),o=(0,l.literal)(`(^|[^a-z0-9_$])from[[:space:]]+${n}($|[^a-z0-9_$])`),c=(0,l.literal)(`(^|[^a-z0-9_$])join[[:space:]]+${n}($|[^a-z0-9_$])`),l.safeSql`
-- Get top 5 SELECT queries involving this table and run through index_advisor
set search_path to public, extensions;

with top_queries as (
  select
    statements.query,
    statements.calls,
    statements.total_exec_time + statements.total_plan_time as total_time,
    statements.mean_exec_time + statements.mean_plan_time as mean_time
  from pg_stat_statements as statements
    inner join pg_authid as auth on statements.userid = auth.oid
  where
    -- Filter for SELECT queries only (index_advisor only works with SELECT)
    (lower(statements.query) like 'select%' or lower(statements.query) like 'with pgrst%')
    -- Filter for queries involving our table. Use regex word boundaries so that e.g.
    -- looking for table "orders" does not match queries on "orders_items".
    and (
      lower(statements.query) ~ ${i}
      or lower(statements.query) ~ ${o}
      or lower(statements.query) ~ ${c}
    )
    -- Exclude system queries
    and statements.query not like '%pg_catalog%'
    and statements.query not like '%information_schema%'
  order by statements.calls desc
  limit 5
)
select
  tq.query,
  tq.calls,
  tq.total_time,
  tq.mean_time,
  coalesce(ia.index_statements, '{}') as index_statements,
  coalesce((ia.startup_cost_before)::numeric, 0) as startup_cost_before,
  coalesce((ia.startup_cost_after)::numeric, 0) as startup_cost_after,
  coalesce((ia.total_cost_before)::numeric, 0) as total_cost_before,
  coalesce((ia.total_cost_after)::numeric, 0) as total_cost_after
from top_queries tq
left join lateral (
  select * from index_advisor(tq.query)
) ia on true;`),{result:h}=await (0,u.executeSql)({projectRef:e,connectionString:t,sql:p}),f=(h||[]).filter(e=>e.index_statements&&e.index_statements.length>0).map(e=>{let t=(0,d.filterProtectedSchemaIndexStatements)(e.index_statements);if(0===t.length)return null;let s=e.total_cost_before>0?(e.total_cost_before-e.total_cost_after)/e.total_cost_before*100:0;return{query:e.query,calls:e.calls,total_time:e.total_time,mean_time:e.mean_time,index_statements:t,startup_cost_before:e.startup_cost_before,startup_cost_after:e.startup_cost_after,total_cost_before:e.total_cost_before,total_cost_after:e.total_cost_after,improvement_percentage:Math.round(100*s)/100}}).filter(e=>null!==e),x=function(e){let t=new Set;for(let s of e){let e=s.match(/USING\s+\w+\s*\(([^)]+)\)/i);e&&e[1].split(",").forEach(e=>{let s=m(e);s&&/^[a-z_][a-z0-9_$]*$/i.test(s)&&t.add(s)})}return Array.from(t)}(f.flatMap(e=>e.index_statements));return{suggestions:f,columnsWithSuggestions:x}}var p=e.i(635494);let h=(0,a.createContext)({isLoading:!1,isAvailable:!1,isEnabled:!1,columnsWithSuggestions:[],suggestions:[],openSheet:()=>{},getSuggestionsForColumn:()=>[],invalidate:async()=>{}});function f({children:e,schema:l,table:d}){let{data:u}=(0,p.useSelectedProjectQuery)(),{isIndexAdvisorAvailable:x,isIndexAdvisorEnabled:g}=(0,n.useIndexAdvisorStatus)(),y=(0,s.useQueryClient)(),[b,q]=(0,a.useState)(!1),[S,v]=(0,a.useState)(void 0),{data:j,isLoading:E}=function({projectRef:e,connectionString:t,schema:s,table:a},{enabled:r=!0,...n}={}){return(0,c.useQuery)({queryKey:o.databaseKeys.tableIndexAdvisor(e,s,a),queryFn:()=>_({projectRef:e,connectionString:t,schema:s,table:a}),enabled:r&&void 0!==e&&!!s&&!!a,retry:!1,staleTime:3e5,...n})}({projectRef:u?.ref,connectionString:u?.connectionString,schema:l,table:d},{enabled:g&&!!l&&!!d}),w=(0,a.useCallback)(e=>{v(e),q(!0)},[]),A=(0,a.useCallback)(()=>{q(!1),v(void 0)},[]),N=(0,a.useCallback)(e=>j?.suggestions?j.suggestions.filter(t=>t.index_statements.some(t=>{let s=t.match(/USING\s+\w+\s*\(([^)]+)\)/i);return!!s&&s[1].split(",").map(e=>m(e)).includes(e)})):[],[j?.suggestions]),R=(0,a.useCallback)(async()=>{u?.ref&&l&&d&&await y.invalidateQueries({queryKey:o.databaseKeys.tableIndexAdvisor(u.ref,l,d)})},[y,u?.ref,l,d]),I=S?N(S)[0]:null,T=I?{errors:[],index_statements:I.index_statements,startup_cost_before:I.startup_cost_before,startup_cost_after:I.startup_cost_after,total_cost_before:I.total_cost_before,total_cost_after:I.total_cost_after}:null,C={isLoading:E,isAvailable:x,isEnabled:g,columnsWithSuggestions:j?.columnsWithSuggestions??[],suggestions:j?.suggestions??[],openSheet:w,getSuggestionsForColumn:N,invalidate:R};return(0,t.jsxs)(h.Provider,{value:C,children:[e,(0,t.jsx)(r.Sheet,{open:b,onOpenChange:e=>!e&&A(),children:(0,t.jsxs)(r.SheetContent,{className:"flex flex-col gap-0 p-0 lg:w-[calc(100vw-802px)]! max-w-[700px]",children:[(0,t.jsx)(r.SheetHeader,{className:"border-b px-5 py-3",children:(0,t.jsx)(r.SheetTitle,{children:"Index Recommendation"})}),I&&(0,t.jsx)(i.QueryIndexes,{selectedRow:{query:I.query},columnName:S,suggestedSelectQuery:I.query,prefetchedIndexAdvisorResult:T,onClose:A})]})})]})}function x(){return(0,a.useContext)(h)}function g(e){let{columnsWithSuggestions:t}=x();return t.includes(e)}}]);

//# debugId=b6814670-a3e8-190d-85d1-879cb8209aa1