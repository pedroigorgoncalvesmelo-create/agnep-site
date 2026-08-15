;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="4107400f-6c2f-77ee-3d11-50c43d6e5ca7")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,820308,775159,e=>{"use strict";e.i(850036);var t,s,a=e.i(479084),r=e.i(55956),n=((t={}).API="api",t.STORAGE="storage",t.AUTH="auth",t.QUERY_PERFORMANCE="query_performance",t.DATABASE="database",t);e.s(["Presets",()=>n],775159);var o=e.i(562616),i=((s={}).LAST_10_MINUTES="Last 10 minutes",s.LAST_30_MINUTES="Last 30 minutes",s.LAST_60_MINUTES="Last 60 minutes",s.LAST_3_HOURS="Last 3 hours",s.LAST_24_HOURS="Last 24 hours",s.LAST_7_DAYS="Last 7 days",s.LAST_14_DAYS="Last 14 days",s.LAST_28_DAYS="Last 28 days",s);let l=[{text:"Last 10 minutes",calcFrom:()=>(0,r.default)().subtract(10,"minute").toISOString(),calcTo:()=>(0,r.default)().toISOString(),availableIn:["free","pro","team","enterprise","platform"]},{text:"Last 30 minutes",calcFrom:()=>(0,r.default)().subtract(30,"minute").toISOString(),calcTo:()=>(0,r.default)().toISOString(),availableIn:["free","pro","team","enterprise","platform"]},{text:"Last 60 minutes",calcFrom:()=>(0,r.default)().subtract(1,"hour").toISOString(),calcTo:()=>(0,r.default)().toISOString(),default:!0,availableIn:["free","pro","team","enterprise","platform"]},{text:"Last 3 hours",calcFrom:()=>(0,r.default)().subtract(3,"hour").toISOString(),calcTo:()=>(0,r.default)().toISOString(),availableIn:["free","pro","team","enterprise","platform"]},{text:"Last 24 hours",calcFrom:()=>(0,r.default)().subtract(1,"day").toISOString(),calcTo:()=>(0,r.default)().toISOString(),availableIn:["free","pro","team","enterprise","platform"]},{text:"Last 7 days",calcFrom:()=>(0,r.default)().subtract(7,"day").toISOString(),calcTo:()=>(0,r.default)().toISOString(),availableIn:["pro","team","enterprise"]},{text:"Last 14 days",calcFrom:()=>(0,r.default)().subtract(14,"day").toISOString(),calcTo:()=>(0,r.default)().toISOString(),availableIn:["team","enterprise"]},{text:"Last 28 days",calcFrom:()=>(0,r.default)().subtract(28,"day").toISOString(),calcTo:()=>(0,r.default)().toISOString(),availableIn:["team","enterprise"]}],c={iso_timestamp_start:l[0].calcFrom(),iso_timestamp_end:l[0].calcTo()};function u(e){return e.replace(/^WHERE/,"AND")}function d(e,t=!0){if(0===e.length)return o.safeSql``;let s=e.map(e=>{let t,s=e.key.split("."),a=[s[s.length-2],s[s.length-1]].join("."),r=e.key.includes(".")?a:e.key;try{t=(0,o.quotedIdent)(r)}catch{return null}let n=isNaN(Number(e.value))?(0,o.analyticsLiteral)(String(e.value)):(0,o.analyticsLiteral)(Number(e.value));switch(e.compare){case"matches":return o.safeSql`REGEXP_CONTAINS(${t}, ${n})`;case"is":default:return o.safeSql`${t} = ${n}`;case"!=":return o.safeSql`${t} != ${n}`;case">=":return o.safeSql`${t} >= ${n}`;case"<=":return o.safeSql`${t} <= ${n}`;case">":return o.safeSql`${t} > ${n}`;case"<":return o.safeSql`${t} < ${n}`}}).filter(e=>null!==e);if(0===s.length)return o.safeSql``;let a=(0,o.joinSqlFragments)(s," AND ");return t?o.safeSql`WHERE ${a}`:o.safeSql`AND ${a}`}let m={[n.API]:{title:"API",queries:{totalRequests:{queryType:"logs",safeSql:e=>o.safeSql`
        -- reports-api-total-requests
        select
          cast(timestamp_trunc(t.timestamp, hour) as datetime) as timestamp,
          count(t.id) as count
        FROM edge_logs t
          cross join unnest(metadata) as m
          cross join unnest(m.response) as response
          cross join unnest(m.request) as request
          cross join unnest(request.headers) as headers
          ${d(e)}
        GROUP BY
          timestamp
        ORDER BY
          timestamp ASC`},topRoutes:{queryType:"logs",safeSql:e=>o.safeSql`
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
          ${d(e)}
        group by
          request.path, request.method, request.search, response.status_code
        order by
          count desc
        limit 10
        `},errorCounts:{queryType:"logs",safeSql:e=>o.safeSql`
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
        ${d(e,!1)}
        GROUP BY
          timestamp
        ORDER BY
          timestamp ASC
        `},topErrorRoutes:{queryType:"logs",safeSql:e=>o.safeSql`
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
        ${d(e,!1)}
        group by
          request.path, request.method, request.search, response.status_code
        order by
          count desc
        limit 10
        `},responseSpeed:{queryType:"logs",safeSql:e=>o.safeSql`
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
          ${d(e)}
        GROUP BY
          timestamp
        ORDER BY
          timestamp ASC
      `},topSlowRoutes:{queryType:"logs",safeSql:e=>o.safeSql`
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
        ${d(e)}
        group by
          request.path, request.method, request.search, response.status_code
        order by
          avg desc
        limit 10
        `},networkTraffic:{queryType:"logs",safeSql:e=>o.safeSql`
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
          ${d(e)}
        GROUP BY
          timestamp
        ORDER BY
          timestamp ASC
        `},requestsByCountry:{queryType:"logs",safeSql:e=>o.safeSql`
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
        ${d(e,!1)}
        group by
          cf.country
        `}}},[n.AUTH]:{title:"",queries:{}},[n.STORAGE]:{title:"Storage",queries:{cacheHitRate:{queryType:"logs",safeSql:e=>o.safeSql`
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
  ${d(e,!1)}
group by timestamp
order by timestamp desc
`},topCacheMisses:{queryType:"logs",safeSql:e=>o.safeSql`
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
  ${d(e,!1)}
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
  WHERE statements.calls > 0 ${t?u(t):a.safeSql``}
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
  WHERE statements.calls > 0 ${t?u(t):a.safeSql``}
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
  WHERE statements.calls > 0 ${t?u(t):a.safeSql``}
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
  from pg_statio_user_tables;`},unified:{queryType:"db",safeSql:(e,t,s,r=!1,n=!1,o=1,i=20)=>{let l=(o-1)*i,c=n&&r?l+10*i:l+i,d=r?Math.min(c,500):c;return a.safeSql`
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
          WHERE statements.calls > 0 ${t?u(t):a.safeSql``}
          ${s||a.safeSql`order by total_time desc`}
          ${null!==d?a.safeSql`limit ${(0,a.literal)(d)}`:a.safeSql``}
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
        limit ${(0,a.literal)(i)} offset ${(0,a.literal)(l)}`}},slowQueriesCount:{queryType:"db",safeSql:()=>a.safeSql`
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
        WHERE statements.calls > 0 ${t?u(t):a.safeSql``}
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
      LIMIT 5;`}}}};e.s(["BURSTABLE_IO_METRIC_KEYS",0,["disk_io_budget","disk_io_consumption"],"DEFAULT_QUERY_PARAMS",0,c,"DEPRECATED_REPORTS",0,["total_realtime_ingress","total_rest_options_requests","total_auth_ingress","total_auth_get_requests","total_auth_post_requests","total_auth_patch_requests","total_auth_options_requests","total_storage_options_requests","total_storage_patch_requests","total_options_requests","total_rest_ingress","total_rest_get_requests","total_rest_post_requests","total_rest_patch_requests","total_rest_delete_requests","total_storage_get_requests","total_storage_post_requests","total_storage_delete_requests","total_auth_delete_requests","total_get_requests","total_patch_requests","total_post_requests","total_ingress","total_delete_requests"],"EDGE_FUNCTION_REGIONS",0,[{key:"ap-northeast-1",label:"Tokyo"},{key:"ap-northeast-2",label:"Seoul"},{key:"ap-south-1",label:"Mumbai"},{key:"ap-southeast-1",label:"Singapore"},{key:"ap-southeast-2",label:"Sydney"},{key:"ca-central-1",label:"Canada Central"},{key:"us-east-1",label:"N. Virginia"},{key:"us-west-1",label:"N. California"},{key:"us-west-2",label:"Oregon"},{key:"eu-central-1",label:"Frankfurt"},{key:"eu-west-1",label:"Ireland"},{key:"eu-west-2",label:"London"},{key:"eu-west-3",label:"Paris"},{key:"sa-east-1",label:"São Paulo"}],"LAYOUT_COLUMN_COUNT",0,2,"PRESET_CONFIG",0,m,"REPORTS_DATEPICKER_HELPERS",0,l,"REPORT_DATERANGE_HELPER_LABELS",()=>i,"generateRegexpWhereSafe",0,d],820308)},610144,e=>{"use strict";e.i(850036);var t=e.i(53336),s=e.i(705541),a=e.i(964574),r=e.i(739114),n=e.i(667286),o=e.i(78162),i=e.i(617361);async function l({projectRef:e,connectionString:s,schema:a,name:r,version:n,cascade:o=!1,createSchema:c=!1}){let u=new Headers;s&&u.set("x-connection-encrypted",s);let d=(0,t.getEnableDatabaseExtensionSQL)({schema:a,name:r,version:n,cascade:o,createSchema:c}),{result:m}=await (0,i.executeSql)({projectRef:e,connectionString:s,sql:d,queryKey:["extension","create"]});return m}e.s(["useDatabaseExtensionEnableMutation",0,({onSuccess:e,onError:t,...i}={})=>{let c=(0,a.useQueryClient)();return(0,s.useMutation)({mutationFn:e=>l(e),async onSuccess(t,s,a){let{projectRef:r}=s;await Promise.all([c.invalidateQueries({queryKey:n.databaseExtensionsKeys.list(r)}),c.invalidateQueries({queryKey:o.configKeys.upgradeEligibility(r)})]),await e?.(t,s,a)},async onError(e,s,a){void 0===t?r.toast.error(`Failed to enable database extension: ${e.message}`):t(e,s,a)},...i})}])},888525,760255,284399,e=>{"use strict";e.i(850036);var t=e.i(479084),s=e.i(739114),a=e.i(617361),r=e.i(392491);function n(e=[]){return{hypopg:e.find(e=>"hypopg"===e.name),indexAdvisor:e.find(e=>"index_advisor"===e.name)}}async function o({projectRef:e,connectionString:r,indexStatements:n,onSuccess:i,onError:l}){if(!e){let e=Error("Project ref is required");return l&&l(e),Promise.reject(e)}if(0===n.length){let e=Error("No index statements provided");return l&&l(e),Promise.reject(e)}try{return await (0,a.executeSql)({projectRef:e,connectionString:r,sql:t.safeSql`${(0,t.joinSqlFragments)(n,";\n")};`}),s.toast.success("Successfully created index"),i&&i(),Promise.resolve()}catch(e){return s.toast.error(`Failed to create index: ${e.message}`),l&&l(e),Promise.reject(e)}}function i(e){return e&&0!==e.length?e.filter(e=>{let t=e.match(/ON\s+(?:"?(\w+)"?\.|(\w+)\.)/i);if(!t)return!0;let s=t[1]||t[2];return!s||!r.INTERNAL_SCHEMAS.includes(s.toLowerCase())}):[]}e.s(["calculateImprovement",0,function(e,t){if(void 0===e||void 0===t)return 0;let s=Number(e),a=Number(t);return s<=0||s<=a?0:(s-a)/s*100},"createIndexes",0,o,"filterProtectedSchemaIndexAdvisorResult",0,function(e){if(!e||!e.index_statements)return e??null;let t=i(e.index_statements);return 0===t.length?null:{...e,index_statements:t}},"filterProtectedSchemaIndexStatements",0,i,"getIndexAdvisorExtensions",0,n,"hasIndexRecommendations",0,function(e,t){return!!(t&&e?.index_statements&&e.index_statements.length>0)},"queryInvolvesProtectedSchemas",0,function(e){if(!e)return!1;let t=e.toLowerCase();return r.INTERNAL_SCHEMAS.some(e=>RegExp(`(?:from|join|update|insert\\s+into|delete\\s+from)\\s+(?:${e}\\.|"${e}"\\.)`,"i").test(t))}],760255);var l=e.i(450972),c=e.i(635494);e.s(["useIndexAdvisorStatus",0,function(){let{data:e}=(0,c.useSelectedProjectQuery)(),{data:t}=(0,l.useDatabaseExtensionsQuery)({projectRef:e?.ref,connectionString:e?.connectionString}),{hypopg:s,indexAdvisor:a}=n(t??[]),r=!!s&&!!a,o=r&&null!==s.installed_version&&null!==a.installed_version;return{isIndexAdvisorAvailable:r,isIndexAdvisorEnabled:o}}],888525);var u=e.i(221628),d=e.i(416340),m=e.i(232520),_=e.i(837710),p=e.i(610144),h=e.i(967052);let f=({open:e,setOpen:t})=>{let a=(0,h.useTrack)(),{data:r}=(0,c.useSelectedProjectQuery)(),{data:o}=(0,l.useDatabaseExtensionsQuery)({projectRef:r?.ref,connectionString:r?.connectionString}),{hypopg:i,indexAdvisor:d}=n(o),{mutateAsync:_,isPending:f}=(0,p.useDatabaseExtensionEnableMutation)(),g=async()=>{if(void 0===r)return s.toast.error("Project is required");try{i?.installed_version===null&&await _({projectRef:r?.ref,connectionString:r?.connectionString,name:i.name,schema:i?.schema??"extensions",version:i.default_version}),d?.installed_version===null&&await _({projectRef:r?.ref,connectionString:r?.connectionString,name:d.name,schema:d?.schema??"extensions",version:d.default_version}),s.toast.success("Successfully enabled Index Advisor!"),t(!1)}catch(e){throw s.toast.error(`Failed to enable Index Advisor: ${e.message}`),e}};return(0,u.jsx)(m.AlertDialog,{open:e,onOpenChange:()=>t(!e),children:(0,u.jsxs)(m.AlertDialogContent,{size:"small",children:[(0,u.jsxs)(m.AlertDialogHeader,{children:[(0,u.jsx)(m.AlertDialogTitle,{children:"Enable Index Advisor"}),(0,u.jsxs)(m.AlertDialogDescription,{className:"flex flex-col gap-y-2",children:[(0,u.jsx)("p",{children:"The Index Advisor recommends indexes to improve query performance on your tables based on your actual query patterns."}),(0,u.jsxs)("p",{children:["This will install the"," ",(0,u.jsx)("code",{className:"text-code-inline break-normal!",children:"index_advisor"})," and"," ",(0,u.jsx)("code",{className:"text-code-inline break-normal!",children:"hypopg"})," Postgres extensions so Index Advisor can analyse queries and suggest performance-improving indexes."]})]})]}),(0,u.jsxs)(m.AlertDialogFooter,{children:[(0,u.jsx)(m.AlertDialogCancel,{children:"Cancel"}),(0,u.jsx)(m.AlertDialogAction,{loading:f,onClick:()=>(a("index_advisor_enable_button_clicked",{origin:"dialog"}),g()),children:f?"Enabling...":"Enable"})]})]})})};e.s(["EnableIndexAdvisorButton",0,()=>{let e=(0,h.useTrack)(),[t,s]=(0,d.useState)(!1);return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(_.Button,{variant:"primary",onClick:()=>{s(!0),e("index_advisor_enable_button_clicked",{origin:"banner"})},children:"Enable"}),(0,u.jsx)(f,{open:t,setOpen:s})]})},"EnableIndexAdvisorDialog",0,f],284399)},749199,e=>{"use strict";var t=e.i(125356),s=e.i(820308),a=e.i(150671),r=e.i(617361),n=e.i(635494),o=e.i(10429),i=e.i(189329);e.s(["default",0,({sql:e,params:l=s.DEFAULT_QUERY_PARAMS,where:c,orderBy:u})=>{let{data:d}=(0,n.useSelectedProjectQuery)(),m=(0,i.useDatabaseSelectorStateSnapshot)(),{data:_}=(0,a.useReadReplicasQuery)({projectRef:d?.ref}),p=(_||[]).find(e=>e.identifier===m.selectedDatabaseId)?.connection_string_read_only,h=m.selectedDatabaseId,f=m.selectedDatabaseId&&m.selectedDatabaseId!==d?.ref?p:p??d?.connectionString,g="function"==typeof e?e([]):e,{data:x,error:S,isPending:y,isRefetching:b,refetch:j}=(0,t.useQuery)({queryKey:["projects",d?.ref,"db",{...l,sql:g,identifier:h,connectionString:f},c,u],queryFn:({signal:e})=>(0,r.executeSql)({projectRef:d?.ref,connectionString:f,sql:g},e).then(e=>e.result),enabled:!!g&&(!o.IS_PLATFORM||!!f),refetchOnWindowFocus:!1,refetchOnReconnect:!1});return{error:S||("object"==typeof x?x?.error:""),data:x,isLoading:y,isRefetching:b,params:l,runQuery:j,resolvedSql:g}}])},695781,e=>{"use strict";let t=(0,e.i(679709).default)("Pen",[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]]);e.s(["Edit2",0,t],695781)},303213,e=>{"use strict";var t=e.i(221628),s=e.i(344580),a=e.i(183808),r=e.i(416340),n=e.i(67318),o=e.i(739114),i=e.i(837710),l=e.i(253214),c=e.i(20482),u=e.i(348481),d=e.i(660908),m=e.i(538482),_=e.i(531837),p=e.i(420985),h=e.i(635494),f=e.i(48189),g=e.i(432478);let x=_.object({name:_.string().min(1,"Required"),description:_.string().optional()});e.s(["CreateReportModal",0,({visible:e,onCancel:_,afterSubmit:S})=>{let y=(0,a.useRouter)(),{profile:b}=(0,g.useProfile)(),{data:j}=(0,h.useSelectedProjectQuery)(),q=j?.ref??"default",E=(0,r.useMemo)(()=>{let{its:e,ite:t,isHelper:s,helperText:a}=y.query,r=new URLSearchParams;e&&"string"==typeof e&&r.set("its",e),t&&"string"==typeof t&&r.set("ite",t),s&&"string"==typeof s&&r.set("isHelper",s),a&&"string"==typeof a&&r.set("helperText",a);let n=r.toString();return n?`?${n}`:""},[y.query]),{mutate:v,isPending:R}=(0,p.useContentUpsertMutation)({onSuccess:(e,t)=>{o.toast.success("Successfully created new report");let s=t.payload.id;y.push(`/project/${q}/observability/${s}${E}`),S()},onError:e=>{o.toast.error(`Failed to create report: ${e.message}`)}}),A=async({name:e,description:t})=>q?b?void v({projectRef:q,payload:{id:(0,f.uuidv4)(),type:"report",name:e,description:t||"",visibility:"project",owner_id:b?.id,content:{schema_version:1,period_start:{time_period:"7d",date:""},period_end:{time_period:"today",date:""},interval:"1d",layout:[]}}}):console.error("Profile is required"):console.error("Project ref is required"),I=()=>{_(),T.reset()},T=(0,n.useForm)({resolver:(0,s.zodResolver)(x),defaultValues:{name:"",description:""}}),{isDirty:O}=T.formState;return(0,t.jsx)(l.Dialog,{open:e,onOpenChange:I,children:(0,t.jsxs)(l.DialogContent,{size:"small",children:[(0,t.jsx)(l.DialogHeader,{children:(0,t.jsx)(l.DialogTitle,{children:"Create a custom report"})}),(0,t.jsx)(l.DialogSectionSeparator,{}),(0,t.jsx)(c.Form,{...T,children:(0,t.jsxs)("form",{onSubmit:T.handleSubmit(A),noValidate:!0,children:[(0,t.jsx)(l.DialogSection,{children:(0,t.jsx)(c.FormField,{control:T.control,name:"name",render:({field:e})=>(0,t.jsx)(m.FormItemLayout,{name:"name",layout:"vertical",label:"Name",children:(0,t.jsx)(c.FormControl,{children:(0,t.jsx)(u.Input,{...e,id:"name"})})})})}),(0,t.jsx)(l.DialogSection,{children:(0,t.jsx)(c.FormField,{control:T.control,name:"description",render:({field:e})=>(0,t.jsx)(m.FormItemLayout,{name:"description",layout:"vertical",label:"Description",children:(0,t.jsx)(c.FormControl,{children:(0,t.jsx)(d.Textarea,{...e,id:"description",rows:4,placeholder:"Describe your custom report",className:"resize-none"})})})})}),(0,t.jsxs)(l.DialogFooter,{children:[(0,t.jsx)(i.Button,{type:"reset",variant:"default",onClick:I,disabled:R,children:"Cancel"}),(0,t.jsx)(i.Button,{type:"submit",loading:R,disabled:R||!O,children:"Create report"})]})]})})]})})}])},300679,258373,e=>{"use strict";e.i(128328);var t=e.i(657588),s=e.i(158639),a=e.i(183808),r=e.i(416340),n=e.i(463333),o=e.i(479084),i=e.i(125356),l=e.i(246230),c=e.i(617361),u=e.i(635494),d=e.i(10429),m=e.i(837508);async function _({projectRef:e,connectionString:t}){let{result:s}=await (0,c.executeSql)({projectRef:e,connectionString:t,sql:o.safeSql`SELECT current_setting('shared_preload_libraries', true) AS libraries`});return(s[0]?.libraries??"").split(",").some(e=>"supamonitor"===e.trim())}var p=e.i(738927),h=e.i(912793),f=e.i(368136);let g=()=>{let e=(0,a.useRouter)();return(0,r.useMemo)(()=>{let{its:t,ite:s,isHelper:a,helperText:r}=e.query,n=new URLSearchParams;t&&"string"==typeof t&&n.set("its",t),s&&"string"==typeof s&&n.set("ite",s),a&&"string"==typeof a&&n.set("isHelper",a),r&&"string"==typeof r&&n.set("helperText",r);let o=n.toString();return o?`?${o}`:""},[e.query])};function x(e){return"report"===e.type}e.s(["useGenerateCustomReportsMenu",0,()=>{let{ref:e}=(0,s.useParams)(),t=g(),{data:a,isPending:r}=(0,p.useContentQuery)({projectRef:e,type:"report"});return{data:function(){if(!a)return[];let s=a?.content.filter(x);return(s?.sort((e,t)=>e.name<t.name?-1:+(e.name>t.name))).map((s,a)=>({id:s.id,name:s.name,description:s.description||"",key:s.id||a+"-report",url:`/project/${e}/observability/${s.id}${t}`,hasDropdownActions:!0,report:s}))}(),isLoading:r}},"useGenerateObservabilityMenu",0,()=>{let{ref:e}=(0,s.useParams)(),a=g(),{isSupamonitorEnabled:r}=function(){let{data:e}=(0,u.useSelectedProjectQuery)(),{data:t,isLoading:s}=(({projectRef:e,connectionString:t},{enabled:s=!0,...a}={})=>{let{data:r}=(0,u.useSelectedProjectQuery)(),n=r?.status===m.PROJECT_STATUS.ACTIVE_HEALTHY;return(0,i.useQuery)({queryKey:l.databaseKeys.supamonitorEnabled(e),queryFn:()=>_({projectRef:e,connectionString:t}),enabled:s&&void 0!==e&&n,...a})})({projectRef:e?.ref,connectionString:e?.connectionString});return{isSupamonitorEnabled:t??!1,isLoading:s}}(),o=(0,t.useFlag)("observabilityOverview"),c=(0,n.useIsDatabaseConnectionsEnabled)(),p=(0,h.useIsFeatureEnabled)("project_storage:all"),x=`/project/${e}/observability`,S=[...o?[{name:"Overview",key:"observability",url:`${x}${a}`,shortcutId:f.SHORTCUT_IDS.NAV_OBSERVABILITY_OVERVIEW}]:[],...r?[{name:"Query Insights",key:"query-insights",url:`${x}/query-insights${a}`,shortcutId:f.SHORTCUT_IDS.NAV_OBSERVABILITY_QUERY_PERFORMANCE}]:[{name:"Query Performance",key:"query-performance",url:`${x}/query-performance${a}`,shortcutId:f.SHORTCUT_IDS.NAV_OBSERVABILITY_QUERY_PERFORMANCE}],...d.IS_PLATFORM?[{name:"API Gateway",key:"api-overview",url:`${x}/api-overview${a}`,shortcutId:f.SHORTCUT_IDS.NAV_OBSERVABILITY_API_GATEWAY}]:[],...c?[{name:"Database Connections",key:"connections",url:`${x}/connections`,shortcutId:f.SHORTCUT_IDS.NAV_OBSERVABILITY_API_GATEWAY}]:[]],y=[{name:"Database",key:"database",url:`${x}/database${a}`,shortcutId:f.SHORTCUT_IDS.NAV_OBSERVABILITY_DATABASE},{name:"Data API",key:"postgrest",url:`${x}/postgrest${a}`,shortcutId:f.SHORTCUT_IDS.NAV_OBSERVABILITY_DATA_API},{name:"Auth",key:"auth",url:`${x}/auth${a}`,shortcutId:f.SHORTCUT_IDS.NAV_OBSERVABILITY_AUTH},{name:"Edge Functions",key:"edge-functions",url:`${x}/edge-functions${a}`,shortcutId:f.SHORTCUT_IDS.NAV_OBSERVABILITY_FUNCTIONS},...p?[{name:"Storage",key:"storage",url:`${x}/storage${a}`,shortcutId:f.SHORTCUT_IDS.NAV_OBSERVABILITY_STORAGE}]:[],{name:"Realtime",key:"realtime",url:`${x}/realtime${a}`,shortcutId:f.SHORTCUT_IDS.NAV_OBSERVABILITY_REALTIME}],b=[{title:"GENERAL",key:"general-section",items:S}];return d.IS_PLATFORM&&b.push({title:"PRODUCT",key:"product-section",items:y}),b}],300679);var S=e.i(221628),y=e.i(452239),b=e.i(695781),j=e.i(944109),q=e.i(23370),E=e.i(640040),v=e.i(837710),R=e.i(874311),A=e.i(862326),I=e.i(2579),T=e.i(432478);e.s(["ObservabilityMenuItem",0,({item:e,pageKey:t,onSelectEdit:s,onSelectDelete:a})=>{let{profile:r}=(0,T.useProfile)(),{can:n}=(0,I.useAsyncCheckPermissions)(y.PermissionAction.UPDATE,"user_content",{resource:{type:"report",visibility:e.report.visibility,owner_id:e.report.owner_id},subject:{id:r?.id}}),o=(0,S.jsx)(A.Menu.Item,{active:e.key===t,className:"pr-2.5",children:(0,S.jsxs)("div",{className:"flex w-full items-center justify-between gap-1",children:[(0,S.jsx)("p",{className:"truncate w-full",children:e.name}),n&&(0,S.jsxs)(R.DropdownMenu,{children:[(0,S.jsx)(R.DropdownMenuTrigger,{asChild:!0,children:(0,S.jsx)(v.Button,{"aria-label":"More actions",variant:"text",className:"px-0.5 h-[20px] opacity-50 hover:opacity-100",icon:(0,S.jsx)(j.MoreVertical,{size:12,strokeWidth:2}),onClick:e=>{e.preventDefault(),e.stopPropagation()}})}),(0,S.jsxs)(R.DropdownMenuContent,{align:"start",className:"w-44 *:gap-x-2",children:[(0,S.jsxs)(R.DropdownMenuItem,{onClick:t=>{t.preventDefault(),t.stopPropagation(),e.id&&s()},children:[(0,S.jsx)(b.Edit2,{size:12}),(0,S.jsx)("div",{children:"Rename report"})]}),(0,S.jsx)(R.DropdownMenuSeparator,{}),(0,S.jsxs)(R.DropdownMenuItem,{onClick:t=>{t.preventDefault(),t.stopPropagation(),e.id&&a()},children:[(0,S.jsx)(q.Trash,{size:12}),(0,S.jsx)("div",{children:"Delete report"})]})]})]})]})});return(0,S.jsx)(E.default,{href:e.url,className:"block",children:o},e.key+"-menukey")}],258373)},256337,e=>{"use strict";var t=e.i(221628),s=e.i(452239);e.i(128328);var a=e.i(158639),r=e.i(231175),n=e.i(183808),o=e.i(871569),i=e.i(416340),l=e.i(739114),c=e.i(862326),u=e.i(466472),d=e.i(498377),m=e.i(108151),_=e.i(300679),p=e.i(258373),h=e.i(303213),f=e.i(344580),g=e.i(67318),x=e.i(837710),S=e.i(253214),y=e.i(20482),b=e.i(348481),j=e.i(660908),q=e.i(538482),E=e.i(531837),v=e.i(420985);let R=E.object({name:E.string().min(1,"Required"),description:E.string().optional()}),A=({selectedReport:e,initialValues:s,onCancel:r})=>{let{ref:n}=(0,a.useParams)(),{mutate:o,isPending:c}=(0,v.useContentUpsertMutation)({onSuccess:()=>{l.toast.success("Successfully updated report"),r()},onError:e=>{l.toast.error(`Failed to update report: ${e.message}`)}}),u=()=>{r(),d.reset()},d=(0,g.useForm)({resolver:(0,f.zodResolver)(R),defaultValues:s}),{formState:m,reset:_}=d,{isDirty:p}=m;return(0,i.useEffect)(()=>{p||_(s)},[s,p,_]),(0,t.jsx)(S.Dialog,{open:void 0!==e,onOpenChange:u,children:(0,t.jsxs)(S.DialogContent,{size:"small",children:[(0,t.jsx)(S.DialogHeader,{children:(0,t.jsx)(S.DialogTitle,{children:"Update custom report"})}),(0,t.jsx)(S.DialogSectionSeparator,{}),(0,t.jsx)(y.Form,{...d,children:(0,t.jsxs)("form",{onSubmit:d.handleSubmit(t=>n?e&&e.id?void(e.project_id&&o({projectRef:n,payload:{...e,owner_id:e.owner_id,project_id:e.project_id,id:e.id,name:t.name,description:t.description||""}})):void 0:console.error("Project ref is required")),noValidate:!0,children:[(0,t.jsx)(S.DialogSection,{children:(0,t.jsx)(y.FormField,{control:d.control,name:"name",render:({field:e})=>(0,t.jsx)(q.FormItemLayout,{name:"name",layout:"vertical",label:"Name",children:(0,t.jsx)(y.FormControl,{children:(0,t.jsx)(b.Input,{...e,id:"name"})})})})}),(0,t.jsx)(S.DialogSection,{children:(0,t.jsx)(y.FormField,{control:d.control,name:"description",render:({field:e})=>(0,t.jsx)(q.FormItemLayout,{name:"description",layout:"vertical",label:"Description",children:(0,t.jsx)(y.FormControl,{children:(0,t.jsx)(j.Textarea,{...e,id:"description",rows:4,placeholder:"Describe your custom report",className:"resize-none"})})})})}),(0,t.jsxs)(S.DialogFooter,{children:[(0,t.jsx)(x.Button,{type:"reset",variant:"default",onClick:u,disabled:c,children:"Cancel"}),(0,t.jsx)(x.Button,{type:"submit",loading:c,disabled:c||!p,children:"Save custom report"})]})]})})]})})};var I=e.i(215312),T=e.i(388147),O=e.i(11872),w=e.i(586011),N=e.i(2579),D=e.i(10429),C=e.i(432478),k=e.i(368136),L=e.i(194125);e.s(["ObservabilityMenu",0,()=>{let e=(0,n.useRouter)(),{profile:f}=(0,C.useProfile)(),{ref:g,id:x}=(0,a.useParams)(),S=x||e.pathname.split("/")[4]||"observability",y=(0,_.useGenerateObservabilityMenu)(),{data:b,isLoading:j}=(0,_.useGenerateCustomReportsMenu)(),{can:q}=(0,N.useAsyncCheckPermissions)(s.PermissionAction.CREATE,"user_content",{resource:{type:"report",owner_id:f?.id},subject:{id:f?.id}}),{mutateAsync:E}=(0,w.useContentDeleteMutation)({onError:()=>{}}),[v,R]=(0,i.useState)(!1),[P,$]=(0,o.useQueryState)("newReport",o.parseAsBoolean.withDefault(!1).withOptions({history:"push",clearOnDefault:!0})),[F,M]=(0,i.useState)(),[B,U]=(0,i.useState)();return(0,L.useShortcut)(k.SHORTCUT_IDS.OBSERVABILITY_NEW_REPORT,()=>{$(!0)},{enabled:D.IS_PLATFORM&&q}),(0,t.jsxs)("div",{children:[(0,t.jsx)(O.ProductMenuShortcuts,{menu:y}),j?(0,t.jsxs)("div",{className:"px-5 my-4 space-y-2",children:[(0,t.jsx)(m.ShimmeringLoader,{}),(0,t.jsx)(m.ShimmeringLoader,{className:"w-3/4"}),(0,t.jsx)(m.ShimmeringLoader,{className:"w-1/2"})]}):(0,t.jsxs)("div",{className:"flex flex-col",children:[(0,t.jsx)(T.ProductMenu,{page:S,menu:y.map(e=>({...e,items:e.items.map(e=>({...e,items:[]}))}))}),D.IS_PLATFORM&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:"h-px w-full bg-border-overlay"}),(0,t.jsxs)("div",{className:"mx-2 my-4",children:[(0,t.jsxs)(c.Menu,{type:"pills",children:[(0,t.jsx)(c.Menu.Group,{title:(0,t.jsxs)("span",{className:"flex w-full items-center justify-between relative h-6",children:[(0,t.jsx)("span",{className:"uppercase font-mono",children:"Custom Reports"}),b.length>0&&(0,t.jsx)(I.ButtonTooltip,{variant:"default",size:"tiny",icon:(0,t.jsx)(r.Plus,{}),disabled:!q,className:"flex items-center justify-center h-6 w-6 absolute top-0 -right-1",onClick:()=>{$(!0)},tooltip:{content:{side:"bottom",text:q?void 0:"You need additional permissions to create custom reports"}}})]})}),b.length>0&&b.map(e=>(0,t.jsx)(p.ObservabilityMenuItem,{item:e,pageKey:S,onSelectEdit:()=>{U(e.report)},onSelectDelete:()=>{M(e.report),R(!0)}},e.id))]}),0===b.length?(0,t.jsx)("div",{className:"px-2",children:(0,t.jsx)(d.InnerSideBarEmptyPanel,{title:"No custom reports yet",description:"Create and save custom reports to track your project metrics",actions:(0,t.jsx)(I.ButtonTooltip,{variant:"default",icon:(0,t.jsx)(r.Plus,{}),disabled:!q,onClick:()=>{$(!0)},tooltip:{content:{side:"bottom",text:q?void 0:"You need additional permissions to create custom reports"}},children:"New custom report"})})}):null]})]}),(0,t.jsx)(A,{onCancel:()=>U(void 0),selectedReport:B,initialValues:{name:B?.name||"",description:B?.description||""}}),(0,t.jsx)(u.ConfirmationModal,{title:"Delete custom report",confirmLabel:"Delete report",size:"medium",loading:!1,visible:v,onCancel:()=>R(!1),onConfirm:()=>{if(void 0===g)return console.error("Project ref is required");if(F?.id===void 0)return console.error("Report ID is required");let t=F.id,s=x===t;R(!1);let a=E({projectRef:g,ids:[t]});l.toast.promise(a,{loading:"Deleting report...",success:"Report deleted",error:e=>`Failed to delete report: ${e?.message??"Unknown error"}`}),a.then(()=>{s&&e.push(`/project/${g}/observability`)}).catch(()=>{})},children:(0,t.jsx)("div",{className:"text-sm text-foreground-light grid gap-4",children:(0,t.jsx)("div",{className:"grid gap-1",children:(0,t.jsxs)("p",{children:["Are you sure you want to delete '",F?.name,"'?"]})})})}),(0,t.jsx)(h.CreateReportModal,{visible:P,onCancel:()=>$(!1),afterSubmit:()=>$(!1)})]})]})}],256337)},212846,e=>{"use strict";var t=e.i(221628);e.i(128328);var s=e.i(947748),a=e.i(657588),r=e.i(158639),n=e.i(180079),o=e.i(416340),i=e.i(825713),l=e.i(256337),c=e.i(463333),u=e.i(888525);e.i(69870);var d=e.i(587433),m=e.i(837710),_=e.i(877555),p=e.i(670447),h=e.i(470754),f=e.i(124416),g=e.i(967052);let x=()=>{let e=(0,g.useTrack)(),{ref:a}=(0,r.useParams)(),{dismissBanner:n}=(0,h.useBannerStack)(),{selectFeaturePreview:o}=(0,c.useFeaturePreviewModal)(),[,i]=(0,f.useLocalStorageQuery)(s.LOCAL_STORAGE_KEYS.DATABASE_CONNECTIONS_BANNER_DISMISSED(a??""),!1);return(0,t.jsx)(p.BannerCard,{onDismiss:()=>{i(!0),n("database-connections-banner"),e("database_connections_banner_dismiss_button_clicked")},children:(0,t.jsxs)("div",{className:"flex flex-col gap-y-4",children:[(0,t.jsxs)("div",{className:"flex flex-col gap-y-2 items-start w-full",children:[(0,t.jsx)(d.Badge,{variant:"success",className:"-ml-0.5 uppercase inline-flex items-center",children:"Preview"}),(0,t.jsxs)("div",{className:"-mx-6 w-[calc(100%+3rem)] bg-linear-to-t from-background to-transparent px-6 py-2 border-b",children:[(0,t.jsxs)("div",{className:"flex items-center gap-x-2",children:[(0,t.jsx)("div",{children:(0,t.jsx)(_.WarningIcon,{})}),(0,t.jsx)("p",{className:"text-xs font-mono uppercase tracking-tigher text-warning",children:"Blocking"}),(0,t.jsx)("p",{className:"truncate text-xs font-mono tracking-tighter",children:"update orders set status = $1 where id = $2;"})]}),(0,t.jsxs)("div",{className:"pl-[7.5px]",children:[(0,t.jsxs)("div",{className:"relative flex items-center gap-x-2 pl-4 pt-2 pb-1",children:[(0,t.jsx)("div",{className:"absolute left-0 top-0 h-full border-l border-stronger"}),(0,t.jsx)("div",{className:"absolute left-0 top-1/2 w-3 border-b border-stronger"}),(0,t.jsx)("p",{className:"text-xs font-mono uppercase tracking-tigher text-foreground-light",children:"Waiting"}),(0,t.jsx)("p",{className:"truncate text-xs font-mono tracking-tighter text-foreground-lighter",children:"select * from orders where id = $1 for update"})]}),(0,t.jsxs)("div",{className:"relative flex items-center gap-x-2 pl-4 py-1",children:[(0,t.jsx)("div",{className:"absolute left-0 top-0 h-1/2 w-3 border-l border-b border-stronger rounded-bl-md"}),(0,t.jsx)("p",{className:"text-xs font-mono uppercase tracking-tigher text-foreground-light",children:"Waiting"}),(0,t.jsx)("p",{className:"truncate text-xs font-mono tracking-tighter text-foreground-lighter",children:"update orders set status = $1 where id = $2;"})]})]})]})]}),(0,t.jsxs)("div",{className:"flex flex-col gap-y-1 mb-2",children:[(0,t.jsx)("p",{className:"text-sm font-medium",children:"Diagnose blocked queries"}),(0,t.jsx)("p",{className:"text-xs text-foreground-lighter text-balance",children:"See what's blocking your database and terminate the session causing it."})]}),(0,t.jsx)("div",{className:"flex gap-2",children:(0,t.jsx)(m.Button,{variant:"default",size:"tiny",onClick:()=>{e("database_connections_banner_cta_button_clicked",{isEnabled:!1}),o(s.LOCAL_STORAGE_KEYS.UI_PREVIEW_DATABASE_CONNECTIONS)},children:"Enable Database Connections"})})]})})};var S=e.i(260727),y=e.i(284399);let b=()=>{let e=(0,g.useTrack)(),{ref:a}=(0,r.useParams)(),{dismissBanner:n}=(0,h.useBannerStack)(),[,o]=(0,f.useLocalStorageQuery)(s.LOCAL_STORAGE_KEYS.INDEX_ADVISOR_NOTICE_DISMISSED(a??""),!1);return(0,t.jsx)(p.BannerCard,{onDismiss:()=>{o(!0),n("index-advisor-banner"),e("index_advisor_banner_dismiss_button_clicked")},children:(0,t.jsxs)("div",{className:"flex flex-col gap-y-4",children:[(0,t.jsx)("div",{className:"flex flex-col gap-y-2 items-start",children:(0,t.jsx)("div",{className:"p-2 rounded-lg bg-warning-300 text-warning",children:(0,t.jsx)(S.Lightbulb,{size:16})})}),(0,t.jsxs)("div",{className:"flex flex-col gap-y-1 mb-2",children:[(0,t.jsx)("p",{className:"text-sm font-medium",children:"Enable Index Advisor"}),(0,t.jsx)("p",{className:"text-xs text-foreground-lighter text-balance",children:"Recommends indexes to improve query performance."})]}),(0,t.jsx)("div",{className:"flex gap-2",children:(0,t.jsx)(y.EnableIndexAdvisorButton,{})})]})})};var j=e.i(902780),q=e.i(912793),E=e.i(951138);let v=({title:e,children:d})=>{let{ref:m}=(0,r.useParams)(),_=(0,n.usePathname)(),{hasLoaded:p}=(0,a.useFeatureFlags)(),{addBanner:g,dismissBanner:S}=(0,h.useBannerStack)(),{isIndexAdvisorAvailable:y,isIndexAdvisorEnabled:E}=(0,u.useIndexAdvisorStatus)(),[v]=(0,f.useLocalStorageQuery)(s.LOCAL_STORAGE_KEYS.INDEX_ADVISOR_NOTICE_DISMISSED(m??""),!1),R=(0,c.useIsDatabaseConnectionsEnabled)(),[A,,{isSuccess:I}]=(0,f.useLocalStorageQuery)(s.LOCAL_STORAGE_KEYS.DATABASE_CONNECTIONS_BANNER_DISMISSED(m??""),!1),T=(0,o.useRef)(_);(0,o.useEffect)(()=>{p&&I&&!A&&!R&&g({id:"database-connections-banner",priority:2,isDismissed:!1,content:(0,t.jsx)(x,{})})},[p,g,S,A,R,I]),(0,o.useEffect)(()=>{let e=_?.includes("/query-performance");e&&y&&!E&&!v?g({id:"index-advisor-banner",isDismissed:!1,content:(0,t.jsx)(b,{}),priority:3}):(v||!e||E)&&S("index-advisor-banner"),T.current=_},[_,y,E,v,g,S]);let{reportsAll:O}=(0,q.useIsFeatureEnabled)(["reports:all"]);return O?(0,t.jsx)(i.ProjectLayout,{product:"Observability",browserTitle:{section:e},productMenu:(0,t.jsx)(l.ObservabilityMenu,{}),isBlocking:!1,children:d}):(0,t.jsx)(j.UnknownInterface,{urlBack:`/project/${m}`})},R=(0,E.withAuth)(e=>{let{ref:s}=(0,r.useParams)(),{reportsAll:a}=(0,q.useIsFeatureEnabled)(["reports:all"]);return a?(0,t.jsx)(v,{...e}):(0,t.jsx)(j.UnknownInterface,{urlBack:`/project/${s}`})});e.s(["default",0,R],212846)},821539,e=>{"use strict";var t=e.i(10429);let s={overview:`${t.DOCS_URL}/guides/telemetry/reports`,queryPerformance:`${t.DOCS_URL}/guides/platform/performance#examining-query-performance`,queryInsights:`${t.DOCS_URL}/guides/platform/performance#examining-query-performance`,apiGateway:`${t.DOCS_URL}/guides/telemetry/reports#api-gateway`,database:`${t.DOCS_URL}/guides/telemetry/reports#database`,dataApi:`${t.DOCS_URL}/guides/telemetry/reports#postgrest`,auth:`${t.DOCS_URL}/guides/telemetry/reports#auth`,edgeFunctions:`${t.DOCS_URL}/guides/telemetry/reports#edge-functions`,storage:`${t.DOCS_URL}/guides/telemetry/reports#storage`,realtime:`${t.DOCS_URL}/guides/realtime/reports`,customReport:`${t.DOCS_URL}/guides/telemetry/reports#using-reports`};e.s(["OBSERVABILITY_DOCS_HREFS",0,s])}]);

//# debugId=4107400f-6c2f-77ee-3d11-50c43d6e5ca7