;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="3067b2e3-b4ce-3545-6ed8-afe60106e38f")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,850036,479084,332357,721490,247309,387578,640696,517638,53336,957386,779262,538892,190804,788035,389273,e=>{"use strict";var t,a=e.i(97429),n=e.i(248593);let i=new Set(["AES128","AES256","ALL","ALLOWOVERWRITE","ANALYSE","ANALYZE","AND","ANY","ARRAY","AS","ASC","ASYMMETRIC","AUTHORIZATION","BACKUP","BETWEEN","BIGINT","BINARY","BIT","BLANKSASNULL","BOOLEAN","BOTH","BYTEDICT","CASE","CAST","CHAR","CHARACTER","CHECK","COALESCE","COLLATE","COLLATION","COLUMN","CONCURRENTLY","CONSTRAINT","CREATE","CREDENTIALS","CROSS","CURRENT_CATALOG","CURRENT_DATE","CURRENT_ROLE","CURRENT_SCHEMA","CURRENT_TIME","CURRENT_TIMESTAMP","CURRENT_USER_ID","CURRENT_USER","DEC","DECIMAL","DEFAULT","DEFERRABLE","DEFLATE","DEFRAG","DELETE","DELTA","DELTA32K","DESC","DISABLE","DISTINCT","DO","ELSE","EMPTYASNULL","ENABLE","ENCODE","ENCRYPT","ENCRYPTION","END","EXCEPT","EXISTS","EXPLICIT","EXTRACT","FALSE","FETCH","FLOAT","FOR","FOREIGN","FREEZE","FROM","FULL","GLOBALDICT256","GLOBALDICT64K","GRANT","GREATEST","GROUP","GROUPING","GZIP","HAVING","IDENTITY","IGNORE","ILIKE","IN","INITIALLY","INNER","INOUT","INSERT","INT","INTEGER","INTERSECT","INTERVAL","INTO","IS","ISNULL","JOIN","JSON_ARRAY","JSON_ARRAYAGG","JSON_EXISTS","JSON_OBJECT","JSON_OBJECTAGG","JSON_QUERY","JSON_SCALAR","JSON_SERIALIZE","JSON_TABLE","JSON_VALUE","JSON","LATERAL","LEADING","LEAST","LEFT","LIKE","LIMIT","LOCALTIME","LOCALTIMESTAMP","LUN","LUNS","LZO","LZOP","MERGE_ACTION","MINUS","MOSTLY13","MOSTLY32","MOSTLY8","NATIONAL","NATURAL","NCHAR","NEW","NONE","NORMALIZE","NOT","NOTNULL","NULL","NULLIF","NULLS","NUMERIC","OFF","OFFLINE","OFFSET","OLD","ON","ONLY","OPEN","OR","ORDER","OUT","OUTER","OVERLAPS","OVERLAY","PARALLEL","PARTITION","PERCENT","PLACING","POSITION","PRECISION","PRIMARY","RAW","READRATIO","REAL","RECOVER","REFERENCES","REJECTLOG","RESORT","RESTORE","RETURNING","RIGHT","ROW","SELECT","SESSION_USER","SETOF","SIMILAR","SMALLINT","SOME","SUBSTRING","SYMMETRIC","SYSDATE","SYSTEM_USER","SYSTEM","TABLE","TABLESAMPLE","TAG","TDES","TEXT255","TEXT32K","THEN","TIME","TIMESTAMP","TO","TOP","TRAILING","TREAT","TRIM","TRUE","TRUNCATECOLUMNS","UNION","UNIQUE","UPDATE","USER","USING","VALUES","VARCHAR","VARIADIC","VERBOSE","WALLET","WHEN","WHERE","WINDOW","WITH","WITHOUT","XMLATTRIBUTES","XMLCONCAT","XMLELEMENT","XMLEXISTS","XMLFOREST","XMLNAMESPACES","XMLPARSE","XMLPI","XMLROOT","XMLSERIALIZE","XMLTABLE"]);function r(e){return e.replace("T"," ").replace("Z","+00")}function s(e,t,a){let n=p``;for(let[e,i]of(n=p`${n} (`,t.entries()))n=p`${n}${0===e?p``:p`, `}${a(i)}`;return p`${n})`}function o(e){if(null==e)throw Error("SQL identifier cannot be null or undefined");if(!1===e)return'"f"';if(!0===e)return'"t"';if(e instanceof Date)return p`"${r(e.toISOString())}"`;if(Array.isArray(e)){let t=[];for(let a of e)if(!0===Array.isArray(a))throw TypeError("Nested array to grouped list conversion is not supported for SQL identifier");else t.push(o(a));return t.toString()}else if(e===Object(e))throw Error("SQL identifier cannot be an object");let t=String(e).slice(0);if(!0===/^[_a-z][\d$_a-z]*$/.test(t)&&!1==!!i.has(t.toUpperCase()))return t;let a='"';for(let e of t)a+='"'===e?e+e:e;return a+'"'}function l(e){let t,a="";if(null==e)return"NULL";if("bigint"==typeof e)return BigInt(e).toString();if(e===1/0)return"'Infinity'";if(e===-1/0)return"'-Infinity'";if(Number.isNaN(e))return"'NaN'";if("number"==typeof e)return Number(e).toString();if(!1===e)return"'f'";if(!0===e)return"'t'";if(e instanceof Date)return p`'${r(e.toISOString())}'`;if(Array.isArray(e)){let t=[];for(let[a,n]of e.entries())!0===Array.isArray(n)?t.push(s(0!==a,n,l)):t.push(l(n));return t.toString()}e===Object(e)?(t="jsonb",a=JSON.stringify(e)):a=String(e).slice(0);let n=!1,i="'";for(let e of a)"'"===e?i+=e+e:"\\"===e?(i+=e+e,n=!0):i+=e;return i+="'",!0===n&&(i=`E${i}`),t&&(i+=`::${t}`),i}let c=new Set(["INSTEAD OF","BY DEFAULT"]);function _(e){if(/^[A-Za-z][A-Za-z0-9_]*$/.test(e)||c.has(e.toUpperCase()))return e;throw Error(`Not a valid keyword: "${e}". Must be a single word matching [A-Za-z][A-Za-z0-9_]*, or one of: ${[...c].join(", ")}.`)}function d(e,...t){let a,n;return a=0,n=RegExp("%(%|(\\d+\\$)?[ILs])","g"),e.replace(n,(e,n)=>{if("%"===n)return p`%`;let i=a,c=n.split("$");if(c.length>1&&(i=Number.parseInt(c[0],10)-1,n=c[1]),i<0)throw Error("specified argument 0 but arguments start at 1");if(i>t.length-1)throw Error("too few arguments");if(a=i+1,"I"===n)return o(t[i]);if("L"===n)return l(t[i]);if("s"===n)return function e(t){if(null==t)return p``;if(!1===t)return p`f`;if(!0===t)return p`t`;if(t instanceof Date)return r(t.toISOString());if(Array.isArray(t)){let a=[];for(let[n,i]of t.entries())null!=i&&(!0===Array.isArray(i)?a.push(s(0!==n,i,e)):a.push(e(i)));return a.toString()}return t&&"object"==typeof t?JSON.stringify(t):String(t).toString().slice(0)}(t[i]);throw Error(`unsupported format type: ${n}`)})}function p(e,...t){return e.reduce((e,a,n)=>e+a+(t[n]??""),"")}function m(e){return e}function E(e,t){return e.join(t)}e.s(["acceptUntrustedSql",0,function(e){return e},"format",0,d,"ident",0,o,"joinSqlFragments",0,E,"keyword",0,_,"literal",0,l,"rawSql",0,m,"safeSql",0,p,"untrustedSql",0,function(e){return e}],479084);let u=(e,t,a)=>{let n=a?p` ORDER BY ${a}`:p``;return p`
COALESCE(
  (
    SELECT
      array_agg(row_to_json(${o(e)})${n}) FILTER (WHERE ${t})
    FROM
      ${o(e)}
  ),
  '{}'
) AS ${o(e)}`};function g(e,t,a){return(a&&(t=a.concat(t??[])),e?.length)?p`IN (${E(e.map(l),",")})`:t?.length?p`NOT IN (${E(t.map(l),",")})`:p``}let N=p`
-- FROZEN legacy path: served while the pgMetaScopedIntrospection flag is off.
-- Do not edit -- it must keep matching production behavior until the flag
-- cleanup deletes it. getScopedColumnPrivilegesSql is the replacement.
--
-- Lists each column's privileges in the form of:
--
-- [
--   {
--     "column_id": "12345.1",
--     "relation_schema": "public",
--     "relation_name": "mytable",
--     "column_name": "mycolumn",
--     "privileges": [
--       {
--         "grantor": "postgres",
--         "grantee": "myrole",
--         "privilege_type": "SELECT",
--         "is_grantable": false
--       },
--       ...
--     ]
--   },
--   ...
-- ]
--
-- Modified from information_schema.column_privileges. We try to be as close as
-- possible to the view definition, obtained from:
--
-- select pg_get_viewdef('information_schema.column_privileges');
--
-- The main differences are:
-- - we include column privileges for materialized views
--   (reason for exclusion in information_schema.column_privileges:
--    https://www.postgresql.org/message-id/9136.1502740844%40sss.pgh.pa.us)
-- - we query a.attrelid and a.attnum to generate column_id
-- - table_catalog is omitted
-- - table_schema -> relation_schema, table_name -> relation_name
--
-- Column privileges are intertwined with table privileges in that table
-- privileges override column privileges. E.g. if we do:
--
-- grant all on mytable to myrole;
--
-- Then myrole is granted privileges for ALL columns. Likewise, if we do:
--
-- grant all (id) on mytable to myrole;
-- revoke all on mytable from myrole;
--
-- Then the grant on the id column is revoked.
--
-- This is unlike how grants for schemas and tables interact, where you need
-- privileges for BOTH the schema the table is in AND the table itself in order
-- to access the table.

select (x.attrelid || '.' || x.attnum) as column_id,
       nc.nspname as relation_schema,
       x.relname as relation_name,
       x.attname as column_name,
       coalesce(
         jsonb_agg(
           jsonb_build_object(
             'grantor', u_grantor.rolname,
             'grantee', grantee.rolname,
             'privilege_type', x.prtype,
             'is_grantable', x.grantable
           )
         ),
         '[]'
       ) as privileges
from
  (select pr_c.grantor,
          pr_c.grantee,
          a.attrelid,
          a.attnum,
          a.attname,
          pr_c.relname,
          pr_c.relnamespace,
          pr_c.prtype,
          pr_c.grantable,
          pr_c.relowner
   from
     (select pg_class.oid,
             pg_class.relname,
             pg_class.relnamespace,
             pg_class.relowner,
             (aclexplode(coalesce(pg_class.relacl, acldefault('r', pg_class.relowner)))).grantor as grantor,
             (aclexplode(coalesce(pg_class.relacl, acldefault('r', pg_class.relowner)))).grantee as grantee,
             (aclexplode(coalesce(pg_class.relacl, acldefault('r', pg_class.relowner)))).privilege_type as privilege_type,
             (aclexplode(coalesce(pg_class.relacl, acldefault('r', pg_class.relowner)))).is_grantable as is_grantable
      from pg_class
      where (pg_class.relkind = any (array['r',
                                           'v',
                                           'm',
                                           'f',
                                           'p'])) ) pr_c(oid, relname, relnamespace, relowner, grantor, grantee, prtype, grantable),
                                                    pg_attribute a
   where ((a.attrelid = pr_c.oid)
          and (a.attnum > 0)
          and (not a.attisdropped))
   union select pr_a.grantor,
                pr_a.grantee,
                pr_a.attrelid,
                pr_a.attnum,
                pr_a.attname,
                c.relname,
                c.relnamespace,
                pr_a.prtype,
                pr_a.grantable,
                c.relowner
   from
     (select a.attrelid,
             a.attnum,
             a.attname,
             (aclexplode(coalesce(a.attacl, acldefault('c', cc.relowner)))).grantor as grantor,
             (aclexplode(coalesce(a.attacl, acldefault('c', cc.relowner)))).grantee as grantee,
             (aclexplode(coalesce(a.attacl, acldefault('c', cc.relowner)))).privilege_type as privilege_type,
             (aclexplode(coalesce(a.attacl, acldefault('c', cc.relowner)))).is_grantable as is_grantable
      from (pg_attribute a
            join pg_class cc on ((a.attrelid = cc.oid)))
      where ((a.attnum > 0)
             and (not a.attisdropped))) pr_a(attrelid, attnum, attname, grantor, grantee, prtype, grantable),
                                        pg_class c
   where ((pr_a.attrelid = c.oid)
          and (c.relkind = any (ARRAY['r',
                                      'v',
                                      'm',
                                      'f',
                                      'p'])))) x,
     pg_namespace nc,
     pg_authid u_grantor,
  (select pg_authid.oid,
          pg_authid.rolname
   from pg_authid
   union all select (0)::oid as oid,
                    'PUBLIC') grantee(oid, rolname)
where ((x.relnamespace = nc.oid)
       and (x.grantee = grantee.oid)
       and (x.grantor = u_grantor.oid)
       and (x.prtype = any (ARRAY['INSERT',
                                  'SELECT',
                                  'UPDATE',
                                  'REFERENCES']))
       and (pg_has_role(u_grantor.oid, 'USAGE')
            or pg_has_role(grantee.oid, 'USAGE')
            or (grantee.rolname = 'PUBLIC')))
group by column_id,
         nc.nspname,
         x.relname,
         x.attname
`,b=a.z.object({grantor:a.z.string(),grantee:a.z.string(),privilege_type:a.z.union([a.z.literal("SELECT"),a.z.literal("INSERT"),a.z.literal("UPDATE"),a.z.literal("REFERENCES")]),is_grantable:a.z.boolean()}),f=a.z.object({column_id:a.z.string(),relation_schema:a.z.string(),relation_name:a.z.string(),column_name:a.z.string(),privileges:a.z.array(b)}),h=a.z.array(f);a.z.object({columnId:a.z.string(),grantee:a.z.string(),privilegeType:a.z.union([a.z.literal("ALL"),a.z.literal("SELECT"),a.z.literal("INSERT"),a.z.literal("UPDATE"),a.z.literal("REFERENCES")]),isGrantable:a.z.boolean().optional()});let T={oid:p`c.oid`},v=({filter:e}={})=>{let t=e?p`AND ${T[e.column]} ${e.predicate}`:p``;return p`
-- Adapted from information_schema.columns

SELECT
  c.oid :: int8 AS table_id,
  nc.nspname AS schema,
  c.relname AS table,
  (c.oid || '.' || a.attnum) AS id,
  a.attnum AS ordinal_position,
  a.attname AS name,
  CASE
    WHEN a.atthasdef THEN pg_get_expr(ad.adbin, ad.adrelid)
    ELSE NULL
  END AS default_value,
  CASE
    WHEN t.typtype = 'd' THEN CASE
      WHEN bt.typelem <> 0 :: oid
      AND bt.typlen = -1 THEN 'ARRAY'
      WHEN nbt.nspname = 'pg_catalog' THEN format_type(t.typbasetype, NULL)
      ELSE 'USER-DEFINED'
    END
    ELSE CASE
      WHEN t.typelem <> 0 :: oid
      AND t.typlen = -1 THEN 'ARRAY'
      WHEN nt.nspname = 'pg_catalog' THEN format_type(a.atttypid, NULL)
      ELSE 'USER-DEFINED'
    END
  END AS data_type,
  COALESCE(bt.typname, t.typname) AS format,
  COALESCE(nbt.nspname, nt.nspname) AS format_schema,
  a.attidentity IN ('a', 'd') AS is_identity,
  CASE
    a.attidentity
    WHEN 'a' THEN 'ALWAYS'
    WHEN 'd' THEN 'BY DEFAULT'
    ELSE NULL
  END AS identity_generation,
  a.attgenerated IN ('s') AS is_generated,
  NOT (
    a.attnotnull
    OR t.typtype = 'd' AND t.typnotnull
  ) AS is_nullable,
  (
    c.relkind IN ('r', 'p')
    OR c.relkind IN ('v', 'f') AND pg_column_is_updatable(c.oid, a.attnum, FALSE)
  ) AS is_updatable,
  uniques.table_id IS NOT NULL AS is_unique,
  check_constraints.definition AS "check",
  array_to_json(
    array(
      SELECT
        enumlabel
      FROM
        pg_catalog.pg_enum enums
      WHERE
        enums.enumtypid = coalesce(bt.oid, t.oid)
        OR enums.enumtypid = coalesce(bt.typelem, t.typelem)
      ORDER BY
        enums.enumsortorder
    )
  ) AS enums,
  col_description(c.oid, a.attnum) AS comment
FROM
  pg_attribute a
  LEFT JOIN pg_attrdef ad ON a.attrelid = ad.adrelid
  AND a.attnum = ad.adnum
  JOIN (
    pg_class c
    JOIN pg_namespace nc ON c.relnamespace = nc.oid
  ) ON a.attrelid = c.oid
  JOIN (
    pg_type t
    JOIN pg_namespace nt ON t.typnamespace = nt.oid
  ) ON a.atttypid = t.oid
  LEFT JOIN (
    pg_type bt
    JOIN pg_namespace nbt ON bt.typnamespace = nbt.oid
  ) ON t.typtype = 'd'
  AND t.typbasetype = bt.oid
  LEFT JOIN (
    SELECT DISTINCT ON (table_id, ordinal_position)
      conrelid AS table_id,
      conkey[1] AS ordinal_position
    FROM pg_catalog.pg_constraint
    WHERE contype = 'u' AND cardinality(conkey) = 1
  ) AS uniques ON uniques.table_id = c.oid AND uniques.ordinal_position = a.attnum
  LEFT JOIN (
    -- We only select the first column check
    SELECT DISTINCT ON (table_id, ordinal_position)
      conrelid AS table_id,
      conkey[1] AS ordinal_position,
      substring(
        pg_get_constraintdef(pg_constraint.oid, true),
        8,
        length(pg_get_constraintdef(pg_constraint.oid, true)) - 8
      ) AS "definition"
    FROM pg_constraint
    WHERE contype = 'c' AND cardinality(conkey) = 1
    ORDER BY table_id, ordinal_position, oid asc
  ) AS check_constraints ON check_constraints.table_id = c.oid AND check_constraints.ordinal_position = a.attnum
WHERE
  NOT pg_is_other_temp_schema(nc.oid)
  AND a.attnum > 0
  AND NOT a.attisdropped
  AND (c.relkind IN ('r', 'v', 'm', 'f', 'p'))
  AND (
    pg_has_role(c.relowner, 'USAGE')
    OR has_column_privilege(
      c.oid,
      a.attnum,
      'SELECT, INSERT, UPDATE, REFERENCES'
    )
  )
  ${t}
`},I=v(),S=a.z.object({id:a.z.string(),table_id:a.z.number(),schema:a.z.string(),table:a.z.string(),name:a.z.string(),ordinal_position:a.z.number(),data_type:a.z.string(),format:a.z.string(),format_schema:a.z.string().optional(),is_identity:a.z.boolean(),identity_generation:a.z.string().nullable(),is_generated:a.z.boolean(),is_nullable:a.z.boolean(),is_updatable:a.z.boolean(),is_unique:a.z.boolean(),check:a.z.string().nullable(),default_value:a.z.any().nullable(),enums:a.z.array(a.z.string()),comment:a.z.string().nullable()}),A=a.z.array(S),R=a.z.optional(S);function O(e){let t=void 0!==e.schema?p`${o(e.schema)}.${o(e.name)}`:o(e.name);return e.isArray?p`${t}[]`:t}let L=p`
SELECT
  name,
  setting,
  category,
  TRIM(split_part(category, '/', 1)) AS group,
  TRIM(split_part(category, '/', 2)) AS subgroup,
  unit,
  short_desc,
  extra_desc,
  context,
  vartype,
  source,
  min_val,
  max_val,
  enumvals,
  boot_val,
  reset_val,
  sourcefile,
  sourceline,
  pending_restart
FROM
  pg_settings
ORDER BY
  category,
  name
`,$=a.z.object({name:a.z.string(),setting:a.z.string(),category:a.z.string(),group:a.z.string(),subgroup:a.z.string(),unit:a.z.string().nullable(),short_desc:a.z.string(),extra_desc:a.z.string().nullable(),context:a.z.string(),vartype:a.z.string(),source:a.z.string(),min_val:a.z.string().nullable(),max_val:a.z.string().nullable(),enumvals:a.z.array(a.z.string()).nullable(),boot_val:a.z.string().nullable(),reset_val:a.z.string().nullable(),sourcefile:a.z.string().nullable(),sourceline:a.z.number().nullable(),pending_restart:a.z.boolean()}),y=a.z.array($),C=p`
SELECT
  e.name,
  n.nspname AS schema,
  e.default_version,
  x.extversion AS installed_version,
  e.comment
FROM
  pg_available_extensions() e(name, default_version, comment)
  LEFT JOIN pg_extension x ON e.name = x.extname
  LEFT JOIN pg_namespace n ON x.extnamespace = n.oid
`,D=a.z.object({name:a.z.string(),schema:a.z.string().nullable(),default_version:a.z.string(),installed_version:a.z.string().nullable(),comment:a.z.string()}),F=a.z.array(D),x=a.z.optional(D),w={list:function({limit:e,offset:t}={}){let a=C;return e&&(a=p`${a} LIMIT ${l(e)}`),t&&(a=p`${a} OFFSET ${l(t)}`),{sql:a,zod:F}},retrieve:function({name:e}){return{sql:p`${C} WHERE name = ${l(e)};`,zod:x}},create:function({name:e,schema:t,version:a,cascade:n=!1}){return{sql:p`
CREATE EXTENSION ${o(e)}
  ${void 0===t?p``:p`SCHEMA ${o(t)}`}
  ${void 0===a?p``:p`VERSION ${l(a)}`}
  ${n?p`CASCADE`:p``};`}},update:function(e,{update:t=!1,version:a,schema:n}){let i=p``;t&&(i=p`ALTER EXTENSION ${o(e)} UPDATE ${void 0===a?p``:p`TO ${l(a)}`};`);let r=void 0===n?p``:p`ALTER EXTENSION ${o(e)} SET SCHEMA ${o(n)};`;return{sql:p`BEGIN; ${i} ${r} COMMIT;`}},remove:function(e,{cascade:t=!1}={}){return{sql:p`DROP EXTENSION ${o(e)} ${t?p`CASCADE`:p`RESTRICT`};`}},zod:D},H=p`
select
  c.oid::int8 as id,
  n.nspname as schema,
  c.relname as name,
  obj_description(c.oid) as comment,
  fs.srvname as foreign_server_name,
  fdw.fdwname as foreign_data_wrapper_name,
  handler.proname as foreign_data_wrapper_handler
from
  pg_class c
  join pg_namespace n on n.oid = c.relnamespace
  inner join pg_foreign_table ft on ft.ftrelid = c.oid
  inner join pg_foreign_server fs on fs.oid = ft.ftserver
  inner join pg_foreign_data_wrapper fdw on fdw.oid = fs.srvfdw
  inner join pg_proc handler on handler.oid = fdw.fdwhandler
where
  c.relkind = 'f'
`,z=a.z.object({id:a.z.number(),schema:a.z.string(),name:a.z.string(),comment:a.z.string().nullable(),foreign_server_name:a.z.string(),foreign_data_wrapper_name:a.z.string(),foreign_data_wrapper_handler:a.z.string(),columns:A.optional()}),U=a.z.array(z),k=a.z.optional(z),M=({includeColumns:e})=>p`
with foreign_tables as (${H})
  ${e?p`, columns as (${I})`:p``}
select
  *
  ${e?p`, ${u("columns",p`columns.table_id = foreign_tables.id`)}`:p``}
from foreign_tables`,P=p`
-- CTE with sane arg_modes, arg_names, and arg_types.
-- All three are always of the same length.
-- All three include all args, including OUT and TABLE args.
with functions as (
  select
    *,
    -- proargmodes is null when all arg modes are IN
    coalesce(
      p.proargmodes,
      array_fill('i'::text, array[cardinality(coalesce(p.proallargtypes, p.proargtypes))])
    ) as arg_modes,
    -- proargnames is null when all args are unnamed
    coalesce(
      p.proargnames,
      array_fill(''::text, array[cardinality(coalesce(p.proallargtypes, p.proargtypes))])
    ) as arg_names,
    -- proallargtypes is null when all arg modes are IN
    coalesce(p.proallargtypes, p.proargtypes) as arg_types,
    array_cat(
      array_fill(false, array[pronargs - pronargdefaults]),
      array_fill(true, array[pronargdefaults])) as arg_has_defaults
  from
    pg_proc as p
  where
    p.prokind in ('f', 'p')
)
select
  f.oid as id,
  n.nspname as schema,
  f.proname as name,
  l.lanname as language,
  case f.prokind
    when 'f' then 'function'
    when 'p' then 'procedure'
    when 'a' then 'aggregate'
    when 'w' then 'window'
    else 'unknown'
  end as type,
  case
    when l.lanname = 'internal' then ''
    else f.prosrc
  end as definition,
  case
    when l.lanname = 'internal' then f.prosrc
    else pg_get_functiondef(f.oid)
  end as complete_statement,
  coalesce(f_args.args, '[]') as args,
  pg_get_function_arguments(f.oid) as argument_types,
  pg_get_function_identity_arguments(f.oid) as identity_argument_types,
  f.prorettype as return_type_id,
  pg_get_function_result(f.oid) as return_type,
  nullif(rt.typrelid, 0) as return_type_relation_id,
  f.proretset as is_set_returning_function,
  case
    when f.provolatile = 'i' then 'IMMUTABLE'
    when f.provolatile = 's' then 'STABLE'
    when f.provolatile = 'v' then 'VOLATILE'
  end as behavior,
  f.prosecdef as security_definer,
  f_config.config_params as config_params
from
  functions f
  left join pg_namespace n on f.pronamespace = n.oid
  left join pg_language l on f.prolang = l.oid
  left join pg_type rt on rt.oid = f.prorettype
  left join (
    select
      oid,
      jsonb_object_agg(param, value) filter (where param is not null) as config_params
    from
      (
        select
          oid,
          (string_to_array(unnest(proconfig), '='))[1] as param,
          (string_to_array(unnest(proconfig), '='))[2] as value
        from
          functions
      ) as t
    group by
      oid
  ) f_config on f_config.oid = f.oid
  left join (
    select
      oid,
      jsonb_agg(jsonb_build_object(
        'mode', t2.mode,
        'name', name,
        'type_id', type_id,
        -- Cast null into false boolean
        'has_default', COALESCE(has_default, false)
      )) as args
    from
      (
        select
          oid,
          unnest(arg_modes) as mode,
          unnest(arg_names) as name,
          -- Coming from: coalesce(p.proallargtypes, p.proargtypes) postgres won't automatically assume
          -- integer, we need to cast it to be properly parsed
          unnest(arg_types)::int8 as type_id,
          unnest(arg_has_defaults) as has_default
        from
          functions
      ) as t1,
      lateral (
        select
          case
            when t1.mode = 'i' then 'in'
            when t1.mode = 'o' then 'out'
            when t1.mode = 'b' then 'inout'
            when t1.mode = 'v' then 'variadic'
            else 'table'
          end as mode
      ) as t2
    group by
      t1.oid
  ) f_args on f_args.oid = f.oid
`,q=a.z.enum(["function","procedure"]),W=a.z.object({id:a.z.number(),schema:a.z.string(),name:a.z.string(),language:a.z.string(),definition:a.z.string(),complete_statement:a.z.string(),args:a.z.array(a.z.object({mode:a.z.union([a.z.literal("in"),a.z.literal("out"),a.z.literal("inout"),a.z.literal("variadic"),a.z.literal("table")]),name:a.z.string(),type_id:a.z.number(),has_default:a.z.boolean()})),type:q,argument_types:a.z.string(),identity_argument_types:a.z.string(),return_type_id:a.z.number(),return_type:a.z.string(),return_type_relation_id:a.z.union([a.z.number(),a.z.null()]),is_set_returning_function:a.z.boolean(),behavior:a.z.union([a.z.literal("IMMUTABLE"),a.z.literal("STABLE"),a.z.literal("VOLATILE")]),security_definer:a.z.boolean(),config_params:a.z.union([a.z.record(a.z.string(),a.z.string()),a.z.null()])}),Y=a.z.array(W),j=a.z.optional(W),G=a.z.object({name:a.z.string(),definition:a.z.string(),type:q.optional(),args:a.z.array(a.z.string()).optional(),behavior:a.z.enum(["IMMUTABLE","STABLE","VOLATILE"]).optional(),config_params:a.z.record(a.z.string(),a.z.string()).optional(),schema:a.z.string().optional(),language:a.z.string().optional(),return_type:a.z.string().optional(),security_definer:a.z.boolean().optional()});function B(e){return e.split(".").map(o).reduce((e,t,a)=>0===a?t:p`${e}.${t}`,p``)}function X({name:e,schema:t,args:a,definition:n,return_type:i,language:r,behavior:s,security_definer:c,config_params:d,type:m="function"},{replace:u=!1}={}){let g="procedure"===m,N=a&&a.length>0?E(a,", "):p``,b=d&&Object.keys(d).length>0?E(Object.entries(d).map(([e,t])=>"FROM CURRENT"===t?p`SET ${B(e)} FROM CURRENT`:p`SET ${B(e)} TO ${'""'===t?l(""):t}`),"\n"):p``;return p`
    CREATE ${u?p`OR REPLACE`:p``} ${g?p`PROCEDURE`:p`FUNCTION`} ${o(t)}.${o(e)}(${N})
    ${g?p``:p`RETURNS ${i}`}
    AS ${l(n)}
    LANGUAGE ${_(r)}
    ${g?p``:p`${_(s)} CALLED ON NULL INPUT`}
    ${c?p`SECURITY DEFINER`:p`SECURITY INVOKER`}
    ${b};
  `}let J=a.z.object({name:a.z.string().optional(),schema:a.z.string().optional(),definition:a.z.string().optional()}),V=a.z.object({cascade:a.z.boolean().default(!1).optional(),type:q.optional()});e.s(["create",0,function({name:e,schema:t="public",args:n=[],definition:i,return_type:r=p`void`,language:s="sql",behavior:o="VOLATILE",security_definer:l=!1,config_params:c={},type:_="function"}){return{sql:X({name:e,schema:t,args:n,definition:i,return_type:r,language:s,behavior:o,security_definer:l,config_params:c,type:_}),zod:a.z.void()}},"list",0,function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:a,limit:i,offset:r}={}){let s=p`
    with f as (
      ${P}
    )
    select
      f.*
    from f
  `,o=g(t,a,e?void 0:n.DEFAULT_SYSTEM_SCHEMAS);return o&&(s=p`${s} where schema ${o}`),i&&(s=p`${s} limit ${l(i)}`),r&&(s=p`${s} offset ${l(r)}`),{sql:s,zod:Y}},"pgFunctionArrayZod",0,Y,"pgFunctionCreateZod",0,G,"pgFunctionDeleteZod",0,V,"pgFunctionOptionalZod",0,j,"pgFunctionUpdateZod",0,J,"pgFunctionZod",0,W,"pgRoutineKindZod",0,q,"remove",0,function(e,{cascade:t=!1}={}){let n="procedure"===e.type?p`PROCEDURE`:p`FUNCTION`;return{sql:p`DROP ${n} ${o(e.schema)}.${o(e.name)}(${e.identity_argument_types}) ${t?p`CASCADE`:p`RESTRICT`};`,zod:a.z.void()}},"retrieve",0,function({id:e,name:t,schema:a="public",args:n=[]}){if(e)return{sql:p`
      with f as (
        ${P}
      )
      select
        f.*
      from f where id = ${l(e)};`,zod:j};if(t&&a&&n){let e=n.length?p`(
          select string_agg(type_oid::text, ' ') from (
            select (
              split_args.arr[
                array_length(
                  split_args.arr,
                  1
                )
              ]::regtype::oid
            ) as type_oid from (
              select string_to_array(
                unnest(
                  array[${E(n.map(l),",")}]
                ),
                ' '
              ) as arr
            ) as split_args
          ) args
        )`:l("");return{sql:p`with f as (
      ${P}
    )
    select
      f.*
    from f join pg_proc as p on id = p.oid where schema = ${l(a)} and name = ${l(t)} and p.proargtypes::text = ${e}`,zod:j}}throw Error("Must provide either id or name and schema")},"update",0,function(e,{name:t,schema:n,definition:i}){let r=e.argument_types.split(", "),s=e.identity_argument_types,c="procedure"===e.type?p`PROCEDURE`:p`FUNCTION`,_="string"==typeof i?X({...e,definition:i,args:r,config_params:e.config_params??{},type:e.type},{replace:!0}):p``,d=t&&t!==e.name?p`ALTER ${c} ${o(e.schema)}.${o(e.name)}(${s}) RENAME TO ${o(t)};`:p``,m=n&&n!==e.schema?p`ALTER ${c} ${o(e.schema)}.${o(t||e.name)}(${s}) SET SCHEMA ${o(n)};`:p``;return{sql:p`
    DO LANGUAGE plpgsql $$
    BEGIN
      IF ${"string"==typeof i?p`TRUE`:p`FALSE`} THEN
        ${_}

        IF (
          SELECT id
          FROM (${P}) AS f
          WHERE f.schema = ${l(e.schema)}
          AND f.name = ${l(e.name)}
          AND f.identity_argument_types = ${l(s)}
        ) != ${l(e.id)} THEN
          RAISE EXCEPTION ${l(`Cannot find function "${e.schema}"."${e.name}"(${s})`)};
        END IF;
      END IF;

      ${d}

      ${m}
    END;
    $$;
  `,zod:a.z.void()}}],198687);var K=e.i(198687);let Q=p`
  SELECT
    idx.indexrelid::int8 AS id,
    idx.indrelid::int8 AS table_id,
    n.nspname AS schema,
    idx.indnatts AS number_of_attributes,
    idx.indnkeyatts AS number_of_key_attributes,
    idx.indisunique AS is_unique,
    idx.indisprimary AS is_primary,
    idx.indisexclusion AS is_exclusion,
    idx.indimmediate AS is_immediate,
    idx.indisclustered AS is_clustered,
    idx.indisvalid AS is_valid,
    idx.indcheckxmin AS check_xmin,
    idx.indisready AS is_ready,
    idx.indislive AS is_live,
    idx.indisreplident AS is_replica_identity,
    idx.indkey::smallint[] AS key_attributes,
    idx.indcollation::integer[] AS collation,
    idx.indclass::integer[] AS class,
    idx.indoption::smallint[] AS options,
    idx.indpred AS index_predicate,
    obj_description(idx.indexrelid, 'pg_class') AS comment,
    ix.indexdef as index_definition,
    am.amname AS access_method,
    jsonb_agg(
      jsonb_build_object(
        'attribute_number', a.attnum,
        'attribute_name', a.attname,
        'data_type', format_type(a.atttypid, a.atttypmod)
      )
      ORDER BY a.attnum
    ) AS index_attributes
  FROM
    pg_index idx
    JOIN pg_class c ON c.oid = idx.indexrelid
    JOIN pg_namespace n ON c.relnamespace = n.oid
    JOIN pg_am am ON c.relam = am.oid
    JOIN pg_attribute a ON a.attrelid = c.oid AND a.attnum = ANY(idx.indkey)
    JOIN pg_indexes ix ON c.relname = ix.indexname AND n.nspname = ix.schemaname
  GROUP BY
    idx.indexrelid, idx.indrelid, n.nspname, idx.indnatts, idx.indnkeyatts, idx.indisunique, 
    idx.indisprimary, idx.indisexclusion, idx.indimmediate, idx.indisclustered, idx.indisvalid, 
    idx.indcheckxmin, idx.indisready, idx.indislive, idx.indisreplident, idx.indkey, 
    idx.indcollation, idx.indclass, idx.indoption, idx.indexprs, idx.indpred, ix.indexdef, am.amname
`,Z=a.z.object({id:a.z.number(),table_id:a.z.number(),schema:a.z.string(),number_of_attributes:a.z.number(),number_of_key_attributes:a.z.number(),is_unique:a.z.boolean(),is_primary:a.z.boolean(),is_exclusion:a.z.boolean(),is_immediate:a.z.boolean(),is_clustered:a.z.boolean(),is_valid:a.z.boolean(),check_xmin:a.z.boolean(),is_ready:a.z.boolean(),is_live:a.z.boolean(),is_replica_identity:a.z.boolean(),key_attributes:a.z.array(a.z.number()),collation:a.z.array(a.z.number()),class:a.z.array(a.z.number()),options:a.z.array(a.z.number()),index_predicate:a.z.string().nullable(),comment:a.z.string().nullable(),index_definition:a.z.string(),access_method:a.z.string(),index_attributes:a.z.array(a.z.object({attribute_number:a.z.number(),attribute_name:a.z.string(),data_type:a.z.string()}))}),ee=a.z.array(Z),et=a.z.optional(Z),ea=p`
select
  c.oid::int8 as id,
  n.nspname as schema,
  c.relname as name,
  c.relispopulated as is_populated,
  obj_description(c.oid) as comment
from
  pg_class c
  join pg_namespace n on n.oid = c.relnamespace
where
  c.relkind = 'm'
`,en=a.z.object({id:a.z.number(),schema:a.z.string(),name:a.z.string(),is_populated:a.z.boolean(),comment:a.z.string().nullable(),columns:A.optional()}),ei=a.z.array(en),er=a.z.optional(en),es=({includeColumns:e})=>p`
with materialized_views as (${ea})
  ${e?p`, columns as (${I})`:p``}
select
  *
  ${e?p`, ${u("columns",p`columns.table_id = materialized_views.id`)}`:p``}
from materialized_views`,eo=p`
select
  pol.oid :: int8 as id,
  n.nspname as schema,
  c.relname as table,
  c.oid :: int8 as table_id,
  pol.polname as name,
  case
    when pol.polpermissive then 'PERMISSIVE'::text
    else 'RESTRICTIVE'::text
  end as action,
  case
    when pol.polroles = '{0}'::oid[] then array_to_json(string_to_array('public'::text, ''::text)::name[])
    else array_to_json(array(
      select pg_roles.rolname
      from pg_roles
      where pg_roles.oid = any(pol.polroles)
      order by pg_roles.rolname
    ))
  end as roles,
  case pol.polcmd
    when 'r'::"char" then 'SELECT'::text
    when 'a'::"char" then 'INSERT'::text
    when 'w'::"char" then 'UPDATE'::text
    when 'd'::"char" then 'DELETE'::text
    when '*'::"char" then 'ALL'::text
    else null::text
  end as command,
  pg_get_expr(pol.polqual, pol.polrelid) as definition,
  pg_get_expr(pol.polwithcheck, pol.polrelid) as check
from
  pg_policy pol
  join pg_class c on c.oid = pol.polrelid
  left join pg_namespace n on n.oid = c.relnamespace
`,el=a.z.object({id:a.z.number(),schema:a.z.string(),table:a.z.string(),table_id:a.z.number(),name:a.z.string(),action:a.z.union([a.z.literal("PERMISSIVE"),a.z.literal("RESTRICTIVE")]),roles:a.z.array(a.z.string()),command:a.z.union([a.z.literal("SELECT"),a.z.literal("INSERT"),a.z.literal("UPDATE"),a.z.literal("DELETE"),a.z.literal("ALL")]),definition:a.z.union([a.z.string(),a.z.null()]),check:a.z.union([a.z.string(),a.z.null()])}),ec=a.z.array(el),e_=a.z.optional(el),ed=p`
SELECT
  p.oid :: int8 AS id,
  p.pubname AS name,
  p.pubowner::regrole::text AS owner,
  p.pubinsert AS publish_insert,
  p.pubupdate AS publish_update,
  p.pubdelete AS publish_delete,
  p.pubtruncate AS publish_truncate,
  CASE
    WHEN p.puballtables THEN NULL
    ELSE pr.tables
  END AS tables
FROM
  pg_catalog.pg_publication AS p
  LEFT JOIN LATERAL (
    SELECT
      COALESCE(
        array_agg(
          json_build_object(
            'id',
            c.oid :: int8,
            'name',
            c.relname,
            'schema',
            nc.nspname
          )
        ),
        '{}'
      ) AS tables
    FROM
      pg_catalog.pg_publication_rel AS pr
      JOIN pg_class AS c ON pr.prrelid = c.oid
      join pg_namespace as nc on c.relnamespace = nc.oid
    WHERE
      pr.prpubid = p.oid
  ) AS pr ON 1 = 1
`,ep=a.z.object({id:a.z.number().optional(),name:a.z.string(),schema:a.z.string()}),em=a.z.object({id:a.z.number(),name:a.z.string(),owner:a.z.string(),publish_insert:a.z.boolean(),publish_update:a.z.boolean(),publish_delete:a.z.boolean(),publish_truncate:a.z.boolean(),tables:a.z.array(ep).nullable()}),eE=a.z.array(em),eu=a.z.optional(em),eg=p`
-- Can't use pg_authid here since some managed Postgres providers don't expose it
-- https://github.com/supabase/postgres-meta/issues/212

select
  r.oid as id,
  rolname as name,
  rolsuper as "isSuperuser",
  rolcreatedb as "canCreateDb",
  rolcreaterole as "canCreateRole",
  rolinherit as "inheritRole",
  rolcanlogin as "canLogin",
  rolreplication as "isReplicationRole",
  rolbypassrls as "canBypassRls",
  (
    select
      count(*)
    from
      pg_stat_activity
    where
      r.rolname = pg_stat_activity.usename
  ) as "activeConnections",
  case when rolconnlimit = -1 then current_setting('max_connections') :: int8
       else rolconnlimit
  end as "connectionLimit",
  rolvaliduntil as "validUntil",
  coalesce(r_config.role_configs, '{}') as config
from
  pg_roles r
  left join (
    select
      oid,
      jsonb_object_agg(param, value) filter (where param is not null) as role_configs
    from
      (
        select
          oid,
          (string_to_array(unnest(rolconfig), '='))[1] as param,
          (string_to_array(unnest(rolconfig), '='))[2] as value
        from
          pg_roles
      ) as _
    group by
      oid
  ) r_config on r_config.oid = r.oid
`,eN=a.z.object({id:a.z.number(),name:a.z.string(),isSuperuser:a.z.boolean(),canCreateDb:a.z.boolean(),canCreateRole:a.z.boolean(),inheritRole:a.z.boolean(),canLogin:a.z.boolean(),isReplicationRole:a.z.boolean(),canBypassRls:a.z.boolean(),activeConnections:a.z.number(),connectionLimit:a.z.number(),validUntil:a.z.union([a.z.string(),a.z.null()]),config:a.z.record(a.z.string(),a.z.string())}),eb=a.z.array(eN),ef=a.z.optional(eN);function eh(e){if("id"in e&&e.id)return p`${o("id")} = ${l(e.id)}`;if("name"in e&&e.name)return p`${o("name")} = ${l(e.name)}`;throw Error("Must provide either id or name")}let eT=p`
-- Adapted from information_schema.schemata

select
  n.oid as id,
  n.nspname as name,
  u.rolname as owner,
   obj_description(n.oid, 'pg_namespace') AS comment
from
  pg_namespace n,
  pg_roles u
where
  n.nspowner = u.oid
  and (
    pg_has_role(n.nspowner, 'USAGE')
    or has_schema_privilege(n.oid, 'CREATE, USAGE')
  )
  and not pg_catalog.starts_with(n.nspname, 'pg_temp_')
  and not pg_catalog.starts_with(n.nspname, 'pg_toast_temp_')
`,ev=a.z.object({id:a.z.number(),name:a.z.string(),owner:a.z.string(),comment:a.z.string().nullable()}),eI=a.z.array(ev),eS=a.z.optional(ev),eA=p`
-- FROZEN legacy path: served while the pgMetaScopedIntrospection flag is off.
-- Do not edit -- it must keep matching production behavior until the flag
-- cleanup deletes it. getScopedTablePrivilegesSql is the replacement.
--
-- Despite the name \`table_privileges\`, this includes other kinds of relations:
-- views, matviews, etc. "Relation privileges" just doesn't roll off the tongue.
--
-- For each relation, get its relacl in a jsonb format,
-- e.g.
--
-- '{postgres=arwdDxt/postgres}'
--
-- becomes
--
-- [
--   {
--     "grantee": "postgres",
--     "grantor": "postgres",
--     "is_grantable": false,
--     "privilege_type": "INSERT"
--   },
--   ...
-- ]
select
  c.oid as relation_id,
  nc.nspname as schema,
  c.relname as name,
  case
    when c.relkind = 'r' then 'table'
    when c.relkind = 'v' then 'view'
    when c.relkind = 'm' then 'materialized_view'
    when c.relkind = 'f' then 'foreign_table'
    when c.relkind = 'p' then 'partitioned_table'
  end as kind,
  coalesce(
    jsonb_agg(
      jsonb_build_object(
        'grantor', grantor.rolname,
        'grantee', grantee.rolname,
        'privilege_type', _priv.privilege_type,
        'is_grantable', _priv.is_grantable
      )
    ) filter (where _priv is not null),
    '[]'
  ) as privileges
from pg_class c
join pg_namespace as nc
  on nc.oid = c.relnamespace
left join lateral (
  select grantor, grantee, privilege_type, is_grantable
  from aclexplode(coalesce(c.relacl, acldefault('r', c.relowner)))
) as _priv on true
left join pg_roles as grantor
  on grantor.oid = _priv.grantor
left join (
  select
    pg_roles.oid,
    pg_roles.rolname
  from pg_roles
  union all
  select
    (0)::oid as oid, 'PUBLIC'
) as grantee (oid, rolname)
  on grantee.oid = _priv.grantee
where c.relkind in ('r', 'v', 'm', 'f', 'p')
  and not pg_is_other_temp_schema(c.relnamespace)
  and (
    pg_has_role(c.relowner, 'USAGE')
    or has_table_privilege(
      c.oid,
      'SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER'
      || case when current_setting('server_version_num')::int4 >= 170000 then ', MAINTAIN' else '' end
    )
    or has_any_column_privilege(c.oid, 'SELECT, INSERT, UPDATE, REFERENCES')
  )
group by
  c.oid,
  nc.nspname,
  c.relname,
  c.relkind
`,eR=(e=p``)=>p`
select
  c.oid as relation_id,
  nc.nspname as schema,
  c.relname as name,
  case
    when c.relkind = 'r' then 'table'
    when c.relkind = 'v' then 'view'
    when c.relkind = 'm' then 'materialized_view'
    when c.relkind = 'f' then 'foreign_table'
    when c.relkind = 'p' then 'partitioned_table'
  end as kind,
  coalesce(
    jsonb_agg(
      jsonb_build_object(
        'grantor', grantor.rolname,
        'grantee', grantee.rolname,
        'privilege_type', _priv.privilege_type,
        'is_grantable', _priv.is_grantable
      )
    ) filter (where _priv is not null),
    '[]'
  ) as privileges
from pg_class c
join pg_namespace as nc
  on nc.oid = c.relnamespace
left join lateral (
  select grantor, grantee, privilege_type, is_grantable
  from aclexplode(coalesce(c.relacl, acldefault('r', c.relowner)))
) as _priv on true
left join pg_roles as grantor
  on grantor.oid = _priv.grantor
left join (
  select
    pg_roles.oid,
    pg_roles.rolname
  from pg_roles
  union all
  select
    (0)::oid as oid, 'PUBLIC'
) as grantee (oid, rolname)
  on grantee.oid = _priv.grantee
where c.relkind in ('r', 'v', 'm', 'f', 'p')
  and not pg_is_other_temp_schema(c.relnamespace)
  ${e}
  and (
    pg_has_role(c.relowner, 'USAGE')
    or has_table_privilege(
      c.oid,
      'SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER'
      || case when current_setting('server_version_num')::int4 >= 170000 then ', MAINTAIN' else '' end
    )
    or has_any_column_privilege(c.oid, 'SELECT, INSERT, UPDATE, REFERENCES')
  )
group by
  c.oid,
  nc.nspname,
  c.relname,
  c.relkind
`,eO=a.z.object({relation_id:a.z.number(),schema:a.z.string(),name:a.z.string(),kind:a.z.union([a.z.literal("table"),a.z.literal("view"),a.z.literal("materialized_view"),a.z.literal("foreign_table"),a.z.literal("partitioned_table")]),privileges:a.z.array(a.z.object({grantor:a.z.string(),grantee:a.z.string(),privilege_type:a.z.union([a.z.literal("SELECT"),a.z.literal("INSERT"),a.z.literal("UPDATE"),a.z.literal("DELETE"),a.z.literal("TRUNCATE"),a.z.literal("REFERENCES"),a.z.literal("TRIGGER"),a.z.literal("MAINTAIN")]),is_grantable:a.z.boolean()}))}),eL=a.z.array(eO),e$=a.z.optional(eO),ey=e=>{let t=e?p`
  AND c.oid = ${e}`:p``,a=e?p`
      and c.oid = ${e}`:p``,n=e?p`
      and (c.conrelid = ${e} or c.confrelid = ${e})`:p``,i=e?p` order by relationships.constraint_name, relationships.source_column_name, relationships.target_column_name`:p``;return p`
SELECT
  c.oid :: int8 AS id,
  nc.nspname AS schema,
  c.relname AS name,
  c.relrowsecurity AS rls_enabled,
  c.relforcerowsecurity AS rls_forced,
  CASE
    WHEN c.relreplident = 'd' THEN 'DEFAULT'
    WHEN c.relreplident = 'i' THEN 'INDEX'
    WHEN c.relreplident = 'f' THEN 'FULL'
    ELSE 'NOTHING'
  END AS replica_identity,
  pg_total_relation_size(format('%I.%I', nc.nspname, c.relname)) :: int8 AS bytes,
  pg_size_pretty(
    pg_total_relation_size(format('%I.%I', nc.nspname, c.relname))
  ) AS size,
  pg_stat_get_live_tuples(c.oid) AS live_rows_estimate,
  pg_stat_get_dead_tuples(c.oid) AS dead_rows_estimate,
  obj_description(c.oid) AS comment,
  coalesce(pk.primary_keys, '[]') as primary_keys,
  coalesce(
    jsonb_agg(relationships${i}) filter (where relationships is not null),
    '[]'
  ) as relationships
FROM
  pg_namespace nc
  JOIN pg_class c ON nc.oid = c.relnamespace
  left join (
    select
      c.oid::int8 as table_id,
      jsonb_agg(
        jsonb_build_object(
          'table_id', c.oid::int8,
          'schema', n.nspname,
          'table_name', c.relname,
          'name', a.attname
        )
        order by array_position(i.indkey, a.attnum)
      ) as primary_keys
    from
      pg_index i
      join pg_class c on i.indrelid = c.oid
      join pg_namespace n on c.relnamespace = n.oid
      join pg_attribute a on a.attrelid = c.oid and a.attnum = any(i.indkey)
    where
      i.indisprimary${a}
    group by c.oid
  ) as pk
  on pk.table_id = c.oid
  left join (
    select
      c.oid :: int8 as id,
      c.conname as constraint_name,
      nsa.nspname as source_schema,
      csa.relname as source_table_name,
      sa.attname as source_column_name,
      nta.nspname as target_table_schema,
      cta.relname as target_table_name,
      ta.attname as target_column_name
    from
      pg_constraint c
    join (
      pg_attribute sa
      join pg_class csa on sa.attrelid = csa.oid
      join pg_namespace nsa on csa.relnamespace = nsa.oid
    ) on sa.attrelid = c.conrelid and sa.attnum = any (c.conkey)
    join (
      pg_attribute ta
      join pg_class cta on ta.attrelid = cta.oid
      join pg_namespace nta on cta.relnamespace = nta.oid
    ) on ta.attrelid = c.confrelid and ta.attnum = any (c.confkey)
    where
      c.contype = 'f'${n}
  ) as relationships
  on (relationships.source_schema = nc.nspname and relationships.source_table_name = c.relname)
  or (relationships.target_table_schema = nc.nspname and relationships.target_table_name = c.relname)
WHERE
  c.relkind IN ('r', 'p')
  AND NOT pg_is_other_temp_schema(nc.oid)
  AND (
    pg_has_role(c.relowner, 'USAGE')
    OR has_table_privilege(
      c.oid,
      'SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER'
    )
    OR has_any_column_privilege(c.oid, 'SELECT, INSERT, UPDATE, REFERENCES')
  )${t}
group by
  c.oid,
  c.relname,
  c.relrowsecurity,
  c.relforcerowsecurity,
  c.relreplident,
  nc.nspname,
  pk.primary_keys
`},eC=ey(),eD=a.z.object({table_id:a.z.number(),name:a.z.string(),schema:a.z.string(),table_name:a.z.string()}),eF=a.z.object({id:a.z.number(),constraint_name:a.z.string(),source_schema:a.z.string(),source_table_name:a.z.string(),source_column_name:a.z.string(),target_table_schema:a.z.string(),target_table_name:a.z.string(),target_column_name:a.z.string()}),ex=a.z.object({id:a.z.number(),schema:a.z.string(),name:a.z.string(),rls_enabled:a.z.boolean(),rls_forced:a.z.boolean(),replica_identity:a.z.enum(["DEFAULT","INDEX","FULL","NOTHING"]),bytes:a.z.number(),size:a.z.string(),live_rows_estimate:a.z.number(),dead_rows_estimate:a.z.number(),comment:a.z.string().nullable(),primary_keys:a.z.array(eD),relationships:a.z.array(eF),columns:A.optional()}),ew=a.z.array(ex),eH=({includeColumns:e})=>p`
  with tables as (${eC})
  ${e?p`, columns as (${I})`:p``}
  select
    *
    ${e?p`, ${u("columns",p`columns.table_id = tables.id`)}`:p``}
  from tables`;e.s(["create",0,function({name:e,schema:t="public",comment:a,no_transaction:n=!1}){let i=p`CREATE TABLE ${o(t)}.${o(e)} ();`,r=void 0!=a?p`COMMENT ON TABLE ${o(t)}.${o(e)} IS ${l(a)};`:p``;return n?{sql:p`${i} ${r}`}:{sql:p`BEGIN; ${i} ${r} COMMIT;`}},"list",0,function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:a,limit:i,offset:r,includeColumns:s=!0}={}){let o=eH({includeColumns:s}),c=g(t,a,e?void 0:n.DEFAULT_SYSTEM_SCHEMAS);return c&&(o=p`${o} where schema ${c}`),i&&(o=p`${o} limit ${l(i)}`),r&&(o=p`${o} offset ${l(r)}`),{sql:o,zod:ew}},"remove",0,function(e,{cascade:t=!1}={}){return{sql:p`DROP TABLE ${o(e.schema)}.${o(e.name)} ${t?p`CASCADE`:p`RESTRICT`};`}},"retrieve",0,function(e){let t=function(e){if("id"in e&&e.id)return p`${o("id")} = ${l(e.id)}`;if("name"in e&&e.name&&e.schema)return p`${o("name")} = ${l(e.name)} and ${o("schema")} = ${l(e.schema)}`;throw Error("Must provide either id or name and schema")}(e);if(e.scoped){let a;if("id"in e&&e.id)a=p`${l(e.id)}`;else if("name"in e&&e.name&&e.schema)a=p`(select tc.oid from pg_class tc join pg_namespace tn on tn.oid = tc.relnamespace where tc.relname = ${l(e.name)} and tn.nspname = ${l(e.schema)})`;else throw Error("Must provide either id or name and schema");let n=ey(a),i=v({filter:{column:"oid",predicate:p`= ${a}`}});return{sql:p`
  with tables as (${n})
  , columns as (${i})
  select
    *
    , ${u("columns",p`columns.table_id = tables.id`,p`columns.ordinal_position`)}
  from tables where ${t};`,zod:ex}}return{sql:p`${eH({includeColumns:!0})} where ${t};`,zod:ex}},"update",0,function(e,{name:t,schema:a,rls_enabled:n,rls_forced:i,replica_identity:r,replica_identity_index:s,primary_keys:c,comment:d}){let m=p`ALTER TABLE ${o(e.schema)}.${o(e.name)}`,u=void 0===a?p``:p`${m} SET SCHEMA ${o(a)};`,g=p``;if(void 0!==t&&t!==e.name){let n=void 0===a?e.schema:a;g=p`ALTER TABLE ${o(n)}.${o(e.name)} RENAME TO ${o(t)};`}let N=p``;if(void 0!==n){let e=p`${m} ENABLE ROW LEVEL SECURITY;`,t=p`${m} DISABLE ROW LEVEL SECURITY;`;N=n?e:t}let b=p``;if(void 0!==i){let e=p`${m} FORCE ROW LEVEL SECURITY;`,t=p`${m} NO FORCE ROW LEVEL SECURITY;`;b=i?e:t}let f=p``;if(void 0===r);else if("INDEX"===r){if(!s)throw Error("replica_identity_index is required when replica_identity is INDEX");f=p`${m} REPLICA IDENTITY USING INDEX ${o(s)};`}else f=p`${m} REPLICA IDENTITY ${_(r)};`;let h=p``;void 0===c||(h=p`${h}
DO $$
DECLARE
  r record;
BEGIN
  SELECT conname
    INTO r
    FROM pg_constraint
    WHERE contype = 'p' AND conrelid = ${l(e.id)};
  IF r IS NOT NULL THEN
    EXECUTE ${l(`${m} DROP CONSTRAINT `)} || quote_ident(r.conname);
  END IF;
END
$$;
`,0===c.length||(h=p`${h} ${m} ADD PRIMARY KEY (${E(c.map(e=>o(e.name)),",")});`));let T=void 0==d?p``:p`COMMENT ON TABLE ${o(e.schema)}.${o(e.name)} IS ${l(d)};`;return{sql:p`
BEGIN;
  ${N}
  ${b}
  ${f}
  ${h}
  ${T}
  ${u}
  ${g}
COMMIT;`}}],330006);var ez=e.i(330006);let eU=p`
SELECT
  pg_t.oid AS id,
  pg_t.tgrelid AS table_id,
  CASE
    WHEN pg_t.tgenabled = 'D' THEN 'DISABLED'
    WHEN pg_t.tgenabled = 'O' THEN 'ORIGIN'
    WHEN pg_t.tgenabled = 'R' THEN 'REPLICA'
    WHEN pg_t.tgenabled = 'A' THEN 'ALWAYS'
  END AS enabled_mode,
  (
    STRING_TO_ARRAY(
      ENCODE(pg_t.tgargs, 'escape'), '\\000'
    )
  )[:pg_t.tgnargs] AS function_args,
  is_t.trigger_name AS name,
  is_t.event_object_table AS table,
  is_t.event_object_schema AS schema,
  is_t.action_condition AS condition,
  is_t.action_orientation AS orientation,
  is_t.action_timing AS activation,
  ARRAY_AGG(is_t.event_manipulation)::text[] AS events,
  pg_p.proname AS function_name,
  pg_n.nspname AS function_schema
FROM
  pg_trigger AS pg_t
JOIN
  pg_class AS pg_c
ON pg_t.tgrelid = pg_c.oid
JOIN information_schema.triggers AS is_t
ON is_t.trigger_name = pg_t.tgname
AND pg_c.relname = is_t.event_object_table
AND pg_c.relnamespace = (quote_ident(is_t.event_object_schema))::regnamespace
JOIN pg_proc AS pg_p
ON pg_t.tgfoid = pg_p.oid
JOIN pg_namespace AS pg_n
ON pg_p.pronamespace = pg_n.oid
GROUP BY
  pg_t.oid,
  pg_t.tgrelid,
  pg_t.tgenabled,
  pg_t.tgargs,
  pg_t.tgnargs,
  is_t.trigger_name,
  is_t.event_object_table,
  is_t.event_object_schema,
  is_t.action_condition,
  is_t.action_orientation,
  is_t.action_timing,
  pg_p.proname,
  pg_n.nspname
`,ek=a.z.object({id:a.z.number(),table_id:a.z.number(),enabled_mode:a.z.enum(["DISABLED","ORIGIN","REPLICA","ALWAYS"]),function_args:a.z.array(a.z.string()),name:a.z.string(),table:a.z.string(),schema:a.z.string(),condition:a.z.string().nullable(),orientation:a.z.enum(["ROW","STATEMENT"]),activation:a.z.enum(["BEFORE","AFTER","INSTEAD OF"]),events:a.z.array(a.z.string()),function_name:a.z.string(),function_schema:a.z.string()}),eM=a.z.array(ek),eP=a.z.optional(ek);a.z.object({name:a.z.string(),schema:a.z.string().optional().default("public"),table:a.z.string(),function_schema:a.z.string().optional().default("public"),function_name:a.z.string(),function_args:a.z.array(a.z.string()).optional(),activation:a.z.enum(["BEFORE","AFTER","INSTEAD OF"]),events:a.z.array(a.z.string()),orientation:a.z.enum(["ROW","STATEMENT"]).optional(),condition:a.z.string().optional()}),a.z.object({name:a.z.string().optional(),enabled_mode:a.z.enum(["ORIGIN","REPLICA","ALWAYS","DISABLED"]).optional()});let eq=p`
-- FROZEN legacy path: served while the pgMetaScopedIntrospection flag is off.
-- Do not edit -- it must keep matching production behavior until the flag
-- cleanup deletes it. SCOPED_TYPES_SQL is the replacement.
select
  t.oid::int8 as id,
  t.typname as name,
  n.nspname as schema,
  format_type (t.oid, null) as format,
  coalesce(t_enums.enums, '[]') as enums,
  coalesce(t_attributes.attributes, '[]') as attributes,
  obj_description (t.oid, 'pg_type') as comment
from
  pg_type t
  left join pg_namespace n on n.oid = t.typnamespace
  left join (
    select
      enumtypid,
      jsonb_agg(enumlabel order by enumsortorder) as enums
    from
      pg_enum
    group by
      enumtypid
  ) as t_enums on t_enums.enumtypid = t.oid
  left join (
    select
      oid,
      jsonb_agg(
        jsonb_build_object('name', a.attname, 'type_id', a.atttypid::int8)
        order by a.attnum asc
      ) as attributes
    from
      pg_class c
      join pg_attribute a on a.attrelid = c.oid
    where
      c.relkind = 'c' and not a.attisdropped
    group by
      c.oid
  ) as t_attributes on t_attributes.oid = t.typrelid
where
  (
    t.typrelid = 0
    or (
      select
        c.relkind = 'c'
      from
        pg_class c
      where
        c.oid = t.typrelid
    )
  )
`,eW=p`
select
  t.oid::int8 as id,
  t.typname as name,
  n.nspname as schema,
  format_type (t.oid, null) as format,
  coalesce(
    (
      select
        jsonb_agg(e.enumlabel order by e.enumsortorder)
      from
        pg_enum e
      where
        e.enumtypid = t.oid
    ),
    '[]'
  ) as enums,
  coalesce(
    (
      select
        jsonb_agg(
          jsonb_build_object('name', a.attname, 'type_id', a.atttypid::int8)
          order by a.attnum asc
        )
      from
        pg_attribute a
      where
        a.attrelid = t.typrelid and not a.attisdropped
    ),
    '[]'
  ) as attributes,
  obj_description (t.oid, 'pg_type') as comment
from
  pg_type t
  left join pg_namespace n on n.oid = t.typnamespace
where
  (
    t.typrelid = 0
    or (
      select
        c.relkind = 'c'
      from
        pg_class c
      where
        c.oid = t.typrelid
    )
  )
`,eY=a.z.object({id:a.z.number(),name:a.z.string(),schema:a.z.string(),format:a.z.string(),enums:a.z.array(a.z.string()),attributes:a.z.array(a.z.object({name:a.z.string(),type_id:a.z.number()})),comment:a.z.string().nullable()}),ej=a.z.array(eY);e.s(["list",0,function({includeArrayTypes:e=!1,includeSystemSchemas:t=!1,includedSchemas:a,excludedSchemas:i,limit:r,offset:s,scoped:o=!1}={}){let c=o?eW:eq;e||(c=p`${c} and not exists (
      select from pg_type el
      where el.oid = t.typelem
        and el.typarray = t.oid
    )`);let _=g(a,i,t?void 0:n.DEFAULT_SYSTEM_SCHEMAS);return _&&(c=p`${c} and n.nspname ${_}`),o&&(c=p`${c} order by t.oid`),r&&(c=p`${c} limit ${l(r)}`),s&&(c=p`${c} offset ${l(s)}`),{sql:c,zod:ej}}],211309);var eG=e.i(211309);let eB=p`
select
  version(),
  current_setting('server_version_num')::int8 as version_number,
  (
    select
      count(*) as active_connections
    from
      pg_stat_activity
  ) as active_connections,
  current_setting('max_connections')::int8 as max_connections
`,eX=a.z.object({version:a.z.string(),version_number:a.z.number(),active_connections:a.z.number(),max_connections:a.z.number()}),eJ=p`
SELECT
  c.oid :: int8 AS id,
  n.nspname AS schema,
  c.relname AS name,
  (pg_relation_is_updatable(c.oid, false) & 20) = 20 AS is_updatable,
  obj_description(c.oid) AS comment
FROM
  pg_class c
  JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE
  c.relkind = 'v'
`,eV=a.z.object({id:a.z.number(),schema:a.z.string(),name:a.z.string(),is_updatable:a.z.boolean(),comment:a.z.string().nullable(),columns:A.optional()}),eK=a.z.array(eV),eQ=a.z.optional(eV),eZ=({includeColumns:e})=>p`
with views as (${eJ})
  ${e?p`, columns as (${I})`:p``}
select
  *
  ${e?p`, ${u("columns",p`columns.table_id = views.id`)}`:p``}
from views`;function e0(e,t){let a=p`select count(*) from ${e6(e)}`,{filters:n}=t??{};return n&&(a=e7(a,n)),p`${a};`}function e1(e,t){let a=p`truncate ${e6(e)}`,{cascade:n}=t??{};return n&&(a=p`${a} cascade`),p`${a};`}function e2(e,t,a){if(!t||0===t.length)throw Error("no filters for this delete query");let n=p`delete from ${e6(e)}`,{returning:i,enumArrayColumns:r}=a??{};if(t&&(n=e7(n,t)),i){let e=void 0===r||0===r.length?p` returning *`:p` returning *, ${E(r.map(e=>p`${o(e)}::text[]`),",")}`;n=p`${n}${e}`}return p`${n};`}function e3(e,t,a){if(!t||0===t.length)throw Error("no value to insert");let{returning:n,enumArrayColumns:i}=a??{},r=E(Object.keys(t[0]).map(e=>o(e)),","),s=p``;if(s=0==r.length?d(p`insert into %1$s select from jsonb_populate_recordset(null::%1$s, %2$s)`,e6(e),l(JSON.stringify(t))):d(p`insert into %1$s (%2$s) select %2$s from jsonb_populate_recordset(null::%1$s, %3$s)`,e6(e),r,l(JSON.stringify(t))),n){let e=void 0===i||0===i.length?p` returning *`:p` returning *, ${E(i.map(e=>p`${o(e)}::text[]`),",")}`;s=p`${s}${e}`}return p`${s};`}function e8(e,t,a,n=!0,i=!1){var r,s;let c,_=p``,d=t??p`*`;_=p`select ${d} from ${i?(r=e,p`${o(r.name)}`):e6(e)}`;let{filters:m,pagination:u,sorts:g}=a??{};if(m&&(_=e7(_,m)),g&&(s=_,_=0===(c=g.filter(e=>e.column)).length?s:s=p`${s} order by ${E(c.map(e=>{let t=e.ascending?p`asc`:p`desc`,a=e.nullsFirst?p`nulls first`:p`nulls last`;return p`${o(e.table)}.${o(e.column)} ${t} ${a}`}),", ")}`),u){let{limit:e,offset:t}=u??{};_=p`${_} limit ${l(e)} offset ${l(t)}`}return p`${_}${n?p`;`:p``}`}function e4(e,t,a){let{filters:n,returning:i,enumArrayColumns:r}=a??{};if(!n||0===n.length)throw Error("no filters for this update query");let s=E(Object.keys(t).map(e=>o(e)),","),c=d(p`update %1$s set (%2$s) = (select %2$s from json_populate_record(null::%1$s, %3$s))`,e6(e),s,l(JSON.stringify(t)));if(n&&(c=e7(c,n)),i){let e=void 0===r||0===r.length?p` returning *`:p` returning *, ${E(r.map(e=>p`${o(e)}::text[]`),",")}`;c=p`${c}${e}`}return p`${c};`}function e7(e,t){return 0===t.length?e:e=p`${e} where ${E(t.map(e=>{if(Array.isArray(e.column))switch(e.operator){case"in":var t,a,n=e;if(!Array.isArray(n.column))throw Error("Use inFilterSql for single columns");if(!Array.isArray(n.value))throw Error("Values for a tuple 'in' filter must be an array");let i=p`(${E(n.column.map(e=>o(e)),", ")})`,r=n.value.map(e=>{if(Array.isArray(e)){if(e.length!==n.column.length)throw Error("Tuple value length must match column length");return p`(${E(e.map(e=>e5(e)),", ")})`}{let t=String(e).split(",");if(t.length!==n.column.length)throw Error("Tuple value length must match column length");return p`(${E(t.map(e=>e5(e)),", ")})`}});return p`${i} ${n.operator} (${E(r,", ")})`;case"=":case"<>":case">":case"<":case">=":case"<=":var s=e;if(!Array.isArray(s.column))throw Error("Use standard applyFilters for single column");if(!Array.isArray(s.value))throw Error("Tuple filter value must be an array");if(s.value.length!==s.column.length)throw Error("Tuple filter value must have the same length as the column array");let l=p`(${E(s.column.map(e=>o(e)),", ")})`,c=p`(${E(s.value.map(e=>e5(e)),", ")})`;return p`${l} ${s.operator} ${c}`;default:throw Error(`Cannot use ${e.operator} operator in a tuple filter`)}switch(e.operator){case"in":let _;return _=Array.isArray((t=e).value)?t.value.map(e=>e5(e)):String(t.value).split(",").map(e=>e5(e)),p`${o(t.column)} ${t.operator} (${E(_,",")})`;case"is":var d=e;let m=String(d.value);switch(m){case"null":case"false":case"true":case"not null":return p`${o(d.column)} ${d.operator} ${m}`;default:return p`${o(d.column)} ${d.operator} ${e5(d.value)}`}case"~~":case"~~*":case"!~~":case"!~~*":return a=e,p`${o(a.column)}::text ${a.operator} ${e5(a.value)}`;default:return p`${o(e.column)} ${e.operator} ${e5(e.value)}`}})," and ")}`}function e5(e){if("boolean"==typeof e)return e?"true":"false";if("string"==typeof e&&e.startsWith("ARRAY[")){let t=function(e){if(!e.startsWith("ARRAY["))return null;let t=e.slice(6),a=!1,n=-1;for(let e=0;e<t.length;e++){let i=t[e];if(a)"'"===i&&"'"===t[e+1]?e++:"'"===i&&(a=!1);else if("]"===i){n=e;break}else"'"===i&&(a=!0)}if(-1===n)return null;let i=t.slice(0,n),r=t.slice(n+1),s=p``;if(""!==r){let e=r.match(/^::([A-Za-z_][A-Za-z0-9_]*)(\[\])?$/);if(!e)return null;s=p`::${e[1]}${e[2]?p`[]`:p``}`}let o=[],c="",_=!1;for(let e=0;e<i.length;e++){let t=i[e];_?"'"===t&&"'"===i[e+1]?(c+="''",e++):"'"===t?(c+=t,_=!1):c+=t:"'"===t?(_=!0,c+=t):","===t?(o.push(c.trim()),c=""):c+=t}c.trim()&&o.push(c.trim());let d=E(o.map(e=>e.startsWith("'")&&e.endsWith("'")?e.slice(1,-1).replace(/''/g,"'"):e).map(e=>l(e)),",");return p`ARRAY[${d}]${s}`}(e);if(null!==t)return t}return l(e)}function e6(e){return p`${o(e.schema)}.${o(e.name)}`}function e9(e){return p`
    begin;

    ${e}

    commit;
  `}function te(e){return p`
    begin;

    ${e}

    rollback;
  `}e.s([],967533),e.i(967533),e.s(["countQuery",0,e0,"deleteQuery",0,e2,"insertQuery",0,e3,"selectQuery",0,e8,"truncateQuery",0,e1,"updateQuery",0,e4,"wrapWithRollback",0,te,"wrapWithTransaction",0,e9],332357);class tt{table;actionConfig;options;pagination;constructor(e,t,a){this.table=e,this.actionConfig=t,this.options=a}range(e,t){return this.pagination={offset:e,limit:t-e+1},this}toSql(e={isCTE:!1,isFinal:!0}){try{let{actionOptions:t,filters:a,sorts:n}=this.options??{};switch(this.actionConfig.action){case"count":return e0(this.table,{filters:a});case"delete":return e2(this.table,a,{returning:t?.returning,enumArrayColumns:t?.enumArrayColumns});case"insert":return e3(this.table,this.actionConfig.actionValue,{returning:t?.returning,enumArrayColumns:t?.enumArrayColumns});case"select":return e8(this.table,this.actionConfig.actionValue,{filters:a,pagination:this.pagination,sorts:n},e.isFinal,e.isCTE);case"update":return e4(this.table,this.actionConfig.actionValue,{filters:a,returning:t?.returning,enumArrayColumns:t?.enumArrayColumns});case"truncate":return e1(this.table,{cascade:t?.cascade});default:return p``}}catch(e){throw e}}}e.s(["QueryModifier",0,tt],29659);class ta{table;actionConfig;actionOptions;filters;sorts;constructor(e,t,a){this.table=e,this.actionConfig=t,this.actionOptions=a,this.filters=[],this.sorts=[]}filter(e,t,a){return this.filters.push({column:e,operator:t,value:a}),this}match(e){return Object.entries(e).map(([e,t])=>{this.filters.push({column:e,operator:"=",value:t})}),this}order(e,t,a=!0,n=!1){return this.sorts.push({table:e,column:t,ascending:a,nullsFirst:n}),this}range(e,t){return this._getQueryModifier().range(e,t)}clone(){let e=structuredClone({table:this.table,actionConfig:this.actionConfig,actionOptions:this.actionOptions,filters:this.filters,sorts:this.sorts}),t=new ta(e.table,e.actionConfig,e.actionOptions);return t.filters=e.filters,t.sorts=e.sorts,t}toSql(e){return this._getQueryModifier().toSql(e)}_getQueryModifier(){return new tt(this.table,this.actionConfig,{actionOptions:this.actionOptions,filters:this.filters,sorts:this.sorts})}}e.s(["QueryFilter",0,ta],193767);class tn{table;constructor(e){this.table=e}count(){return new ta(this.table,{action:"count"})}delete(e){return new ta(this.table,{action:"delete"},e)}insert(e,t){return new ta(this.table,{action:"insert",actionValue:e},t)}select(e){return new ta(this.table,{action:"select",actionValue:e})}update(e,t){return new ta(this.table,{action:"update",actionValue:e},t)}truncate(e){return new ta(this.table,{action:"truncate"},e)}}e.s(["QueryAction",0,tn],212695);class ti{from(e,t){return new tn({name:e,schema:t??"public"})}}e.s(["Query",0,ti],721490),e.i(721490),e.i(332357),e.i(193767),e.i(212695),e.i(29659),e.s(["Query",0,ti,"QueryAction",0,tn,"QueryFilter",0,ta,"QueryModifier",0,tt,"countQuery",0,e0,"deleteQuery",0,e2,"insertQuery",0,e3,"selectQuery",0,e8,"truncateQuery",0,e1,"updateQuery",0,e4,"wrapWithRollback",0,te,"wrapWithTransaction",0,e9],377171);var tr=e.i(377171);let ts=p`
CREATE OR REPLACE FUNCTION pg_temp.count_estimate(
    query text
) RETURNS integer LANGUAGE plpgsql AS $$
DECLARE
    plan jsonb;
BEGIN
    EXECUTE 'EXPLAIN (FORMAT JSON)' || query INTO plan;
    RETURN plan->0->'Plan'->'Plan Rows';
END;
$$;
`;function to(e,t){let a="00000000-0000-0000-0000-000000000000".split("").map((t,a)=>"-"===t?t:e[a]??t);if(e.length>=a.length)return a.join("");if(e.length&&e.length<15&&(a[14]="4"),e.length&&e.length<20&&(a[19]=t?"b":"8"),t)for(let t=e.length;t<a.length;t+=1)"0"===a[t]&&(a[t]="f");return a.join("")}function tl(e){if(!e)return[e,void 0];let t=e.charCodeAt(e.length-1);if(122===t)return[e,e+"~"];if(t>=126)return[e,e+" "];let a=e.substring(0,e.length-1)+String.fromCharCode(t+1);return[e,a]}e.s(["COUNT_ESTIMATE_SQL",0,ts,"THRESHOLD_COUNT",0,5e4,"THRESHOLD_ESTIMATE_BYTES",0,1e7],247309),e.s(["prefixToUUID",0,to,"stringRange",0,tl],387578);let tc=p`select reltuples as estimate from pg_class where oid = 'auth.users'::regclass`;e.s(["getUsersCountSQL",0,({filter:e,keywords:t,providers:a,forceExactCount:n=!1,column:i})=>{let r=t&&""!==t,s=[],o=p`select count(*) from auth.users`,c=p`select * from auth.users`;if(i&&r){if("email"===i){let e=tl(t),a=l(e[0]),n=e[1]?l(e[1]):null;s.push(p`lower(email) >= ${a}${n?p` and lower(email) < ${n}`:p``} and instance_id = '00000000-0000-0000-0000-000000000000'::uuid`)}else if("phone"===i){let e=tl(t),a=l(e[0]),n=e[1]?l(e[1]):null;s.push(p`phone >= ${a}${n?p` and phone < ${n}`:p``}`)}else if("id"===i){let e=to(t,!1);if(e===t)s.push(p`id = ${l(t)}`);else{let a=to(t,!0);s.push(p`id >= ${l(e)} and id < ${l(a)}`)}}}else{if(r){let e=l(`%${t}%`);s.push(p`id::text ilike ${e} or email ilike ${e} or phone ilike ${e}`)}if("verified"===e?s.push(p`email_confirmed_at IS NOT NULL or phone_confirmed_at IS NOT NULL`):"anonymous"===e?s.push(p`is_anonymous is true`):"unverified"===e&&s.push(p`email_confirmed_at IS NULL AND phone_confirmed_at IS NULL`),a&&a.length>0)if(a.includes("saml 2.0")){let e=a.map(e=>"saml 2.0"===e?"sso":e);s.push(p`(select jsonb_agg(case when value ~ '^sso' then 'sso' else value end) from jsonb_array_elements_text((raw_app_meta_data ->> 'providers')::jsonb)) ?| array[${l(e)}]`)}else s.push(p`(raw_app_meta_data->>'providers')::jsonb ?| array[${l(a)}]`)}let _=E(s.map(e=>p`(${e})`)," and "),d=s.length>0?p` where ${_}`:p``;if(n)return p`select (${o}${d}), false as is_estimate;`;{let e=p`${c}${d}`,t=p`${o}${d}`,a=l(e);return p`${ts}

with approximation as (${tc})
select 
  case 
    when estimate = -1 then (select pg_temp.count_estimate(${a}))::int
    when estimate > ${l(5e4)} then ${s.length>0?p`(select pg_temp.count_estimate(${a}))::int`:p`estimate::int`}
    else (${t})
  end as count,
  estimate = -1 or estimate > ${l(5e4)} as is_estimate
from approximation`}}],640696);let t_=p`
SELECT id, name, file_size_limit
FROM storage.buckets
WHERE file_size_limit IS NOT NULL
ORDER BY file_size_limit DESC
LIMIT ${l(51)};
`;e.s(["LARGEST_SIZE_LIMIT_BUCKETS_COUNT",0,50,"getLargestSizeLimitBucketsSqlUnoptimized",0,t_],517638),e.s(["getDatabaseExtensionsSQL",0,()=>p`
SELECT
  e.name,
  n.nspname AS schema,
  e.default_version,
  x.extversion AS installed_version,
  e.comment,
  ev.schema AS default_version_schema
FROM
  pg_available_extensions e
  LEFT JOIN pg_extension x ON e.name = x.extname
  LEFT JOIN pg_namespace n ON x.extnamespace = n.oid
  LEFT JOIN pg_available_extension_versions ev
    ON ev.name = e.name AND ev.version = e.default_version;
`,"getEnableDatabaseExtensionSQL",0,({schema:e,name:t,version:a,cascade:n,createSchema:i=!1})=>{let{sql:r}=w.create({schema:e,name:t,version:a,cascade:n});return i?p`CREATE SCHEMA IF NOT EXISTS ${o(e)};
${r}`:r}],53336);let td=p`pgmq_public`,tp=p`
  drop function if exists 
    ${td}.pop(queue_name text),
    ${td}.send(queue_name text, message jsonb, sleep_seconds integer),
    ${td}.send_batch(queue_name text, message jsonb[], sleep_seconds integer),
    ${td}.archive(queue_name text, message_id bigint),
    ${td}.delete(queue_name text, message_id bigint),
    ${td}.read(queue_name text, sleep integer, n integer)
  ;

  -- Revoke execute permissions on inner pgmq functions to roles (inverse of enabling)
  do $$
  begin
      if exists (select 1 from pg_namespace where nspname = 'pgmq') then
          -- Revoke privileges on the schema itself
          revoke all on schema pgmq from anon, authenticated, service_role;
          
          -- Revoke default privileges for future objects
          alter default privileges in schema pgmq revoke all on tables from anon, authenticated, service_role;
          alter default privileges in schema pgmq revoke all on sequences from anon, authenticated, service_role;
          alter default privileges in schema pgmq revoke all on functions from anon, authenticated, service_role;
      end if;
  end $$;

  drop schema if exists ${td};
`;e.s(["HIDE_QUEUES_FROM_POSTGREST_SQL",0,tp,"QUEUES_SCHEMA",0,td,"getExposeQueuesSQL",0,({isNewerPgmqversion:e})=>{let t=e?p`, conditional := '{}'::jsonb`:p``,a=e?p`, jsonb`:p``;return p`
  create schema if not exists ${td};
  grant usage on schema ${td} to postgres, anon, authenticated, service_role;

  create or replace function ${td}.pop(
      queue_name text
  )
    returns setof pgmq.message_record
    language plpgsql
    set search_path = ''
  as $$
  begin
      return query
      select *
      from pgmq.pop(
          queue_name := queue_name
      );
  end;
  $$;

  comment on function ${td}.pop(queue_name text) is 'Retrieves and locks the next message from the specified queue.';


  create or replace function ${td}.send(
      queue_name text,
      message jsonb,
      sleep_seconds integer default 0  -- renamed from 'delay'
  )
    returns setof bigint
    language plpgsql
    set search_path = ''
  as $$
  begin
      return query
      select *
      from pgmq.send(
          queue_name := queue_name,
          msg := message,
          delay := sleep_seconds
      );
  end;
  $$;

  comment on function ${td}.send(queue_name text, message jsonb, sleep_seconds integer) is 'Sends a message to the specified queue, optionally delaying its availability by a number of seconds.';


  create or replace function ${td}.send_batch(
      queue_name text,
      messages jsonb[],
      sleep_seconds integer default 0  -- renamed from 'delay'
  )
    returns setof bigint
    language plpgsql
    set search_path = ''
  as $$
  begin
      return query
      select *
      from pgmq.send_batch(
          queue_name := queue_name,
          msgs := messages,
          delay := sleep_seconds
      );
  end;
  $$;

  comment on function ${td}.send_batch(queue_name text, messages jsonb[], sleep_seconds integer) is 'Sends a batch of messages to the specified queue, optionally delaying their availability by a number of seconds.';


  create or replace function ${td}.archive(
      queue_name text,
      message_id bigint
  )
    returns boolean
    language plpgsql
    set search_path = ''
  as $$
  begin
      return
      pgmq.archive(
          queue_name := queue_name,
          msg_id := message_id
      );
  end;
  $$;

  comment on function ${td}.archive(queue_name text, message_id bigint) is 'Archives a message by moving it from the queue to a permanent archive.';


  create or replace function ${td}.delete(
      queue_name text,
      message_id bigint
  )
    returns boolean
    language plpgsql
    set search_path = ''
  as $$
  begin
      return
      pgmq.delete(
          queue_name := queue_name,
          msg_id := message_id
      );
  end;
  $$;

  comment on function ${td}.delete(queue_name text, message_id bigint) is 'Permanently deletes a message from the specified queue.';

  create or replace function ${td}.read(
      queue_name text,
      sleep_seconds integer,
      n integer
  )
    returns setof pgmq.message_record
    language plpgsql
    set search_path = ''
  as $$
  begin
      return query
      select *
      from pgmq.read(
          queue_name := queue_name,
          vt := sleep_seconds,
          qty := n ${t}
      );
  end;
  $$;

  comment on function ${td}.read(queue_name text, sleep_seconds integer, n integer) is 'Reads up to "n" messages from the specified queue with an optional "sleep_seconds" (visibility timeout).';

  -- Grant execute permissions on wrapper functions to roles
  grant execute on function ${td}.pop(text) to postgres, service_role, anon, authenticated;
  grant execute on function pgmq.pop(text) to postgres, service_role, anon, authenticated;

  grant execute on function ${td}.send(text, jsonb, integer) to postgres, service_role, anon, authenticated;
  grant execute on function pgmq.send(text, jsonb, integer) to postgres, service_role, anon, authenticated;

  grant execute on function ${td}.send_batch(text, jsonb[], integer) to postgres, service_role, anon, authenticated;
  grant execute on function pgmq.send_batch(text, jsonb[], integer) to postgres, service_role, anon, authenticated;

  grant execute on function ${td}.archive(text, bigint) to postgres, service_role, anon, authenticated;
  grant execute on function pgmq.archive(text, bigint) to postgres, service_role, anon, authenticated;

  grant execute on function ${td}.delete(text, bigint) to postgres, service_role, anon, authenticated;
  grant execute on function pgmq.delete(text, bigint) to postgres, service_role, anon, authenticated;

  grant execute on function ${td}.read(text, integer, integer) to postgres, service_role, anon, authenticated;
  grant execute on function pgmq.read(text, integer, integer ${a}) to postgres, service_role, anon, authenticated;

  -- For the service role, we want full access
  -- Grant permissions on existing tables
  grant all privileges on all tables in schema pgmq to postgres, service_role;

  -- Ensure service_role has permissions on future tables
  alter default privileges in schema pgmq grant all privileges on tables to postgres, service_role;

  grant usage on schema pgmq to postgres, anon, authenticated, service_role;


  /*
    Grant access to sequences to API roles by default. Existing table permissions
    continue to enforce insert restrictions. This is necessary to accommodate the
    on-backup hook that rebuild queue table primary keys to avoid a pg_dump segfault.
    This can be removed once logical backups are completely retired.
  */
  grant usage, select, update
  on all sequences in schema pgmq
  to anon, authenticated, service_role;

  alter default privileges in schema pgmq
  grant usage, select, update
  on sequences
  to anon, authenticated, service_role;
`},"getQueuesExposePostgrestStatusSQL",0,()=>p`
    SELECT exists (select schema_name FROM information_schema.schemata WHERE schema_name = '${td}');
  `],957386),e.s(["getTableRowsCountSql",0,({table:e,filters:t=[],enforceExactCount:a=!1,isReadOnlyContext:n=!1,scoped:i=!1})=>{if(!e)return p``;if(a){let a=new ti().from(e.name,e.schema??void 0).count();t.filter(e=>e.value&&""!==e.value).forEach(e=>{a=a.filter(e.column,e.operator,e.value)});let n=a.toSql(),i=n.endsWith(";")?n.slice(0,-1):n;return p`select (${i}), false as is_estimate;`}{let a=new ti().from(e.name,e.schema??void 0).select();t.filter(e=>e.value&&""!=e.value).forEach(e=>{a=a.filter(e.column,e.operator,e.value)});let r=a.toSql(),s=r.endsWith(";")?r.slice(0,-1):r,o=new ti().from(e.name,e.schema??void 0).count();t.filter(e=>e.value&&""!=e.value).forEach(e=>{o=o.filter(e.column,e.operator,e.value)});let c=o.toSql(),_=c.endsWith(";")?c.slice(0,-1):c;if(n)return i?p`
with approximation as (
    select
      reltuples as estimate,
      -- Whole-tree heap size. A partitioned PARENT (relkind 'p') has no storage
      -- of its own, so its size is the sum over pg_partition_tree; every other
      -- relkind uses its own heap directly (pg_partition_tree returns NO rows
      -- for a plain non-partitioned table, so it cannot be used unconditionally).
      -- Views/foreign tables yield 0 (-> exact count, unchanged behavior).
      case when relkind = 'p'
        then (select coalesce(sum(pg_relation_size(relid)), 0) from pg_partition_tree(oid))
        else pg_relation_size(oid)
      end as bytes
    from pg_class
    where oid = ${l(e.id)}
)
select
  case
    when estimate > ${l(5e4)} or (estimate = -1 and bytes > ${l(1e7)}) then -1
    else (${_})
  end as count,
  (estimate > ${l(5e4)} or (estimate = -1 and bytes > ${l(1e7)})) as is_estimate
from approximation;
`:p`
with approximation as (
    select reltuples as estimate
    from pg_class
    where oid = ${l(e.id)}
)
select 
  case 
    when estimate > ${l(5e4)} then (select -1)
    else (${_})
  end as count,
  estimate > ${l(5e4)} as is_estimate
from approximation;
`;if(i){let a=p`pg_temp.count_estimate(${l(s)})`;return p`
${ts}

with approximation as (
    select
      reltuples as estimate,
      -- Whole-tree heap size. A partitioned PARENT (relkind 'p') has no storage
      -- of its own, so its size is the sum over pg_partition_tree; every other
      -- relkind uses its own heap directly (pg_partition_tree returns NO rows
      -- for a plain non-partitioned table, so it cannot be used unconditionally).
      -- Views/foreign tables yield 0 (-> exact count, unchanged behavior).
      case when relkind = 'p'
        then (select coalesce(sum(pg_relation_size(relid)), 0) from pg_partition_tree(oid))
        else pg_relation_size(oid)
      end as bytes
    from pg_class
    where oid = ${l(e.id)}
)
select
  case
    when estimate = -1 and bytes > ${l(1e7)} then ${a}
    when estimate > ${l(5e4)} then ${t.length>0?a:p`estimate`}
    else (${_})
  end as count,
  (estimate > ${l(5e4)} or (estimate = -1 and bytes > ${l(1e7)})) as is_estimate
from approximation;
`}return p`
${ts}

with approximation as (
    select reltuples as estimate
    from pg_class
    where oid = ${l(e.id)}
)
select 
  case 
    when estimate > ${l(5e4)} then ${t.length>0?p`pg_temp.count_estimate('${s.replaceAll("'","''")}')`:p`estimate`}
    else (${_})
  end as count,
  estimate > ${l(5e4)} as is_estimate
from approximation;
`}}],779262);let tm=p`
  DROP TYPE IF EXISTS pg_temp.tabledefs CASCADE;
  CREATE TYPE pg_temp.tabledefs AS ENUM ('PKEY_INTERNAL','PKEY_EXTERNAL','FKEYS_INTERNAL', 'FKEYS_EXTERNAL', 'COMMENTS', 'FKEYS_NONE', 'INCLUDE_TRIGGERS', 'NO_TRIGGERS');

  -- SELECT * FROM pg_temp.pg_get_coldef('sample','orders','id');
  -- DROP FUNCTION pg_temp.pg_get_coldef(text,text,text,boolean);
  CREATE OR REPLACE FUNCTION pg_temp.pg_get_coldef(
    in_schema text,
    in_table  text,
    in_column text,
    oldway    boolean default False
  )
  RETURNS text
  LANGUAGE plpgsql VOLATILE
  AS
  $$
  DECLARE
  v_coldef     text;
  v_dt1        text;
  v_dt2        text;
  v_dt3        text;
  v_nullable   boolean;
  v_position   int;
  v_identity   text;
  v_generated  text;
  v_hasdflt    boolean;
  v_dfltexpr   text;

  BEGIN
    IF oldway THEN
      SELECT pg_catalog.format_type(a.atttypid, a.atttypmod) INTO v_coldef FROM pg_namespace n, pg_class c, pg_attribute a, pg_type t
      WHERE n.nspname = in_schema AND n.oid = c.relnamespace AND c.relname = in_table AND a.attname = in_column and a.attnum > 0 AND a.attrelid = c.oid AND a.atttypid = t.oid ORDER BY a.attnum;
      -- RAISE NOTICE 'DEBUG: oldway=%',v_coldef;
    ELSE
      -- a.attrelid::regclass::text, a.attname
      SELECT CASE WHEN a.atttypid = ANY ('{int,int8,int2}'::regtype[]) AND EXISTS (SELECT FROM pg_attrdef ad WHERE ad.adrelid = a.attrelid AND ad.adnum   = a.attnum AND
      pg_get_expr(ad.adbin, ad.adrelid) = 'nextval(''' || (pg_get_serial_sequence (a.attrelid::regclass::text, a.attname))::regclass || '''::regclass)') THEN CASE a.atttypid
      WHEN 'int'::regtype  THEN 'serial' WHEN 'int8'::regtype THEN 'bigserial' WHEN 'int2'::regtype THEN 'smallserial' END ELSE format_type(a.atttypid, a.atttypmod) END AS data_type
      INTO v_coldef FROM pg_namespace n, pg_class c, pg_attribute a, pg_type t
      WHERE n.nspname = in_schema AND n.oid = c.relnamespace AND c.relname = in_table AND a.attname = in_column and a.attnum > 0 AND a.attrelid = c.oid AND a.atttypid = t.oid ORDER BY a.attnum;
      -- RAISE NOTICE 'DEBUG: newway=%',v_coldef;

      -- Issue#24: not implemented yet
      -- might replace with this below to do more detailed parsing...
      -- SELECT a.atttypid::regtype AS dt1, format_type(a.atttypid, a.atttypmod) as dt2, t.typname as dt3, CASE WHEN not(a.attnotnull) THEN True ELSE False END AS nullable,
      -- a.attnum, a.attidentity, a.attgenerated, a.atthasdef, pg_get_expr(ad.adbin, ad.adrelid) dfltexpr
      -- INTO v_dt1, v_dt2, v_dt3, v_nullable, v_position, v_identity, v_generated, v_hasdflt, v_dfltexpr
      -- FROM pg_attribute a JOIN pg_class c ON (a.attrelid = c.oid) JOIN pg_type t ON (a.atttypid = t.oid) LEFT JOIN pg_attrdef ad ON (a.attrelid = ad.adrelid AND a.attnum = ad.adnum)
      -- WHERE c.relkind in ('r','p') AND a.attnum > 0 AND NOT a.attisdropped AND c.relnamespace::regnamespace::text = in_schema AND c.relname = in_table AND a.attname = in_column;
      -- RAISE NOTICE 'schema=%  table=%  column=%  dt1=%  dt2=%  dt3=%  nullable=%  pos=%  identity=%   generated=%  HasDefault=%  DeftExpr=%', in_schema, in_table, in_column, v_dt1,v_dt2,v_dt3,v_nullable,v_position,v_identity,v_generated,v_hasdflt,v_dfltexpr;
    END IF;
    RETURN v_coldef;
  END;
  $$;

  -- SELECT * FROM pg_temp.pg_get_tabledef('sample', 'address', false);
  DROP FUNCTION IF EXISTS pg_temp.pg_get_tabledef(character varying,character varying,boolean,tabledefs[]);
  CREATE OR REPLACE FUNCTION pg_temp.pg_get_tabledef(
    in_schema varchar,
    in_table varchar,
    _verbose boolean,
    VARIADIC arr pg_temp.tabledefs[] DEFAULT '{}':: pg_temp.tabledefs[]
  )
  RETURNS text
  LANGUAGE plpgsql VOLATILE
  AS
  $$
    DECLARE
      v_qualified text := '';
      v_table_ddl text;
      v_table_oid int;
      v_colrec record;
      v_constraintrec record;
      v_trigrec       record;
      v_indexrec record;
      v_rec           record;
      v_constraint_name text;
      v_constraint_def  text;
      v_pkey_def        text := '';
      v_fkey_def        text := '';
      v_fkey_defs       text := '';
      v_trigger text := '';
      v_partition_key text := '';
      v_partbound text;
      v_parent text;
      v_parent_schema text;
      v_persist text;
      v_temp  text := '';
      v_temp2 text;
      v_relopts text;
      v_tablespace text;
      v_pgversion int;
      bSerial boolean;
      bPartition boolean;
      bInheritance boolean;
      bRelispartition boolean;
      constraintarr text[] := '{}';
      constraintelement text;
      bSkip boolean;
      bVerbose boolean := False;
      v_cnt1   integer;
      v_cnt2   integer;
      search_path_old text := '';
      search_path_new text := '';
      v_partial    boolean;
      v_pos        integer;

      -- assume defaults for ENUMs at the getgo
      pkcnt            int := 0;
      fkcnt            int := 0;
      trigcnt          int := 0;
      cmtcnt           int := 0;
      pktype           pg_temp.tabledefs := 'PKEY_INTERNAL';
      fktype           pg_temp.tabledefs := 'FKEYS_INTERNAL';
      trigtype         pg_temp.tabledefs := 'NO_TRIGGERS';
      arglen           integer;
      vargs            text;
      avarg            pg_temp.tabledefs;

      -- exception variables
      v_ret            text;
      v_diag1          text;
      v_diag2          text;
      v_diag3          text;
      v_diag4          text;
      v_diag5          text;
      v_diag6          text;

    BEGIN
      SET client_min_messages = 'notice';
      IF _verbose THEN bVerbose = True; END IF;

      -- v17 fix: handle case-sensitive
      -- v_qualified = in_schema || '.' || in_table;

      arglen := array_length($4, 1);
      IF arglen IS NULL THEN
          -- nothing to do, so assume defaults
          NULL;
      ELSE
          -- loop thru args
          -- IF 'NO_TRIGGERS' = ANY ($4)
          -- select array_to_string($4, ',', '***') INTO vargs;
          IF bVerbose THEN RAISE NOTICE 'arguments=%', $4; END IF;
          FOREACH avarg IN ARRAY $4 LOOP
              IF bVerbose THEN RAISE NOTICE 'arg=%', avarg; END IF;
              IF avarg = 'FKEYS_INTERNAL' OR avarg = 'FKEYS_EXTERNAL' OR avarg = 'FKEYS_NONE' THEN
                  fkcnt = fkcnt + 1;
                  fktype = avarg;
              ELSEIF avarg = 'INCLUDE_TRIGGERS' OR avarg = 'NO_TRIGGERS' THEN
                  trigcnt = trigcnt + 1;
                  trigtype = avarg;
              ELSEIF avarg = 'PKEY_EXTERNAL' THEN
                  pkcnt = pkcnt + 1;
                  pktype = avarg;
              ELSEIF avarg = 'COMMENTS' THEN
                  cmtcnt = cmtcnt + 1;

              END IF;
          END LOOP;
          IF fkcnt > 1 THEN
              RAISE WARNING 'Only one foreign key option can be provided. You provided %', fkcnt;
              RETURN '';
          ELSEIF trigcnt > 1 THEN
              RAISE WARNING 'Only one trigger option can be provided. You provided %', trigcnt;
              RETURN '';
          ELSEIF pkcnt > 1 THEN
              RAISE WARNING 'Only one pkey option can be provided. You provided %', pkcnt;
              RETURN '';
          ELSEIF cmtcnt > 1 THEN
              RAISE WARNING 'Only one comments option can be provided. You provided %', cmtcnt;
              RETURN '';

          END IF;
      END IF;

      SELECT c.oid, (select setting from pg_settings where name = 'server_version_num') INTO v_table_oid, v_pgversion FROM pg_catalog.pg_class c LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
      WHERE c.relkind in ('r','p') AND c.relname = in_table AND n.nspname = in_schema;

    -- set search_path = public before we do anything to force explicit schema qualification but dont forget to set it back before exiting...
      SELECT setting INTO search_path_old FROM pg_settings WHERE name = 'search_path';

      -- RAISE NOTICE 'DEBUG tableddl: saving old search_path: ***%***', search_path_old;
      EXECUTE 'SET search_path = "public"';
      SELECT setting INTO search_path_new FROM pg_settings WHERE name = 'search_path';
      -- RAISE NOTICE 'DEBUG tableddl: using new search path=***%***', search_path_new;

      -- throw an error if table was not found
      IF (v_table_oid IS NULL) THEN
        RAISE EXCEPTION 'table does not exist';
      END IF;

      -- get user-defined tablespaces if applicable
      SELECT tablespace INTO v_temp FROM pg_tables WHERE schemaname = in_schema and tablename = in_table and tablespace IS NOT NULL;
      IF v_temp IS NULL THEN
        v_tablespace := 'TABLESPACE pg_default';
      ELSE
        v_tablespace := 'TABLESPACE ' || v_temp;
      END IF;

      -- also see if there are any SET commands for this table, ie, autovacuum_enabled=off, fillfactor=70
      WITH relopts AS (SELECT unnest(c.reloptions) relopts FROM pg_class c, pg_namespace n WHERE n.nspname = in_schema and n.oid = c.relnamespace and c.relname = in_table)
      SELECT string_agg(r.relopts, ', ') as relopts INTO v_temp from relopts r;
      IF v_temp IS NULL THEN
        v_relopts := '';
      ELSE
        v_relopts := ' WITH (' || v_temp || ')';
      END IF;

      -- -----------------------------------------------------------------------------------
      -- Create table defs for partitions/children using inheritance or declarative methods.
      -- inheritance: pg_class.relkind = 'r'   pg_class.relispartition=false   pg_class.relpartbound is NULL
      -- declarative: pg_class.relkind = 'r'   pg_class.relispartition=true    pg_class.relpartbound is NOT NULL
      -- -----------------------------------------------------------------------------------
      v_partbound := '';
      bPartition := False;
      bInheritance := False;
      IF v_pgversion < 100000 THEN
        -- Issue#11: handle parent schema
        SELECT c2.relname parent, c2.relnamespace::regnamespace INTO v_parent, v_parent_schema from pg_class c1, pg_namespace n, pg_inherits i, pg_class c2
        WHERE n.nspname = in_schema and n.oid = c1.relnamespace and c1.relname = in_table and c1.oid = i.inhrelid and i.inhparent = c2.oid and c1.relkind = 'r';
        IF (v_parent IS NOT NULL) THEN
          bPartition   := True;
          bInheritance := True;
        END IF;
      ELSE
        -- Issue#11: handle parent schema
        SELECT c2.relname parent, c1.relispartition, pg_get_expr(c1.relpartbound, c1.oid, true), c2.relnamespace::regnamespace INTO v_parent, bRelispartition, v_partbound, v_parent_schema from pg_class c1, pg_namespace n, pg_inherits i, pg_class c2
        WHERE n.nspname = in_schema and n.oid = c1.relnamespace and c1.relname = in_table and c1.oid = i.inhrelid and i.inhparent = c2.oid and c1.relkind = 'r';
        IF (v_parent IS NOT NULL) THEN
          bPartition   := True;
          IF bRelispartition THEN
            bInheritance := False;
          ELSE
            bInheritance := True;
          END IF;
        END IF;
      END IF;
      IF bPartition THEN
        --Issue#17 fix for case-sensitive tables
        -- SELECT count(*) INTO v_cnt1 FROM information_schema.tables t WHERE EXISTS (SELECT REGEXP_MATCHES(s.table_name, '([A-Z]+)','g') FROM information_schema.tables s
        -- WHERE t.table_schema=s.table_schema AND t.table_name=s.table_name AND t.table_schema = quote_ident(in_schema) AND t.table_name = quote_ident(in_table) AND t.table_type = 'BASE TABLE');
        SELECT count(*) INTO v_cnt1 FROM information_schema.tables t WHERE EXISTS (SELECT REGEXP_MATCHES(s.table_name, '([A-Z]+)','g') FROM information_schema.tables s
        WHERE t.table_schema=s.table_schema AND t.table_name=s.table_name AND t.table_schema = in_schema AND t.table_name = in_table AND t.table_type = 'BASE TABLE');

        --Issue#19 put double-quotes around SQL keyword column names
        -- Issue#121: fix keyword lookup for table name not column name that does not apply here
        -- SELECT COUNT(*) INTO v_cnt2 FROM pg_get_keywords() WHERE word = v_colrec.column_name AND catcode = 'R';
        SELECT COUNT(*) INTO v_cnt2 FROM pg_get_keywords() WHERE word = in_table AND catcode = 'R';

        IF bInheritance THEN
          -- inheritance-based
          IF v_cnt1 > 0 OR v_cnt2 > 0 THEN
            v_table_ddl := 'CREATE TABLE ' || in_schema || '."' || in_table || '"( '|| E'\\n';
          ELSE
            v_table_ddl := 'CREATE TABLE ' || in_schema || '.' || in_table || '( '|| E'\\n';
          END IF;

          -- Jump to constraints section to add the check constraints
        ELSE
          -- declarative-based
          IF v_relopts <> '' THEN
            IF v_cnt1 > 0 OR v_cnt2 > 0 THEN
              v_table_ddl := 'CREATE TABLE ' || in_schema || '."' || in_table || '" PARTITION OF ' || in_schema || '.' || v_parent || ' ' || v_partbound || v_relopts || ' ' || v_tablespace || '; ' || E'\\n';
            ELSE
              v_table_ddl := 'CREATE TABLE ' || in_schema || '.' || in_table || ' PARTITION OF ' || in_schema || '.' || v_parent || ' ' || v_partbound || v_relopts || ' ' || v_tablespace || '; ' || E'\\n';
            END IF;
          ELSE
            IF v_cnt1 > 0 OR v_cnt2 > 0 THEN
              v_table_ddl := 'CREATE TABLE ' || in_schema || '."' || in_table || '" PARTITION OF ' || in_schema || '.' || v_parent || ' ' || v_partbound || ' ' || v_tablespace || '; ' || E'\\n';
            ELSE
              v_table_ddl := 'CREATE TABLE ' || in_schema || '.' || in_table || ' PARTITION OF ' || in_schema || '.' || v_parent || ' ' || v_partbound || ' ' || v_tablespace || '; ' || E'\\n';
            END IF;
          END IF;
          -- Jump to constraints and index section to add the check constraints and indexes and perhaps FKeys
        END IF;
      END IF;
      IF bVerbose THEN RAISE NOTICE '(1)tabledef so far: %', v_table_ddl; END IF;

      IF NOT bPartition THEN
        -- see if this is unlogged or temporary table
        select c.relpersistence into v_persist from pg_class c, pg_namespace n where n.nspname = in_schema and n.oid = c.relnamespace and c.relname = in_table and c.relkind = 'r';
        IF v_persist = 'u' THEN
          v_temp := 'UNLOGGED';
        ELSIF v_persist = 't' THEN
          v_temp := 'TEMPORARY';
        ELSE
          v_temp := '';
        END IF;
      END IF;

      -- start the create definition for regular tables unless we are in progress creating an inheritance-based child table
      IF NOT bPartition THEN
        --Issue#17 fix for case-sensitive tables
        -- SELECT count(*) INTO v_cnt1 FROM information_schema.tables t WHERE EXISTS (SELECT REGEXP_MATCHES(s.table_name, '([A-Z]+)','g') FROM information_schema.tables s
        -- WHERE t.table_schema=s.table_schema AND t.table_name=s.table_name AND t.table_schema = quote_ident(in_schema) AND t.table_name = quote_ident(in_table) AND t.table_type = 'BASE TABLE');
        SELECT count(*) INTO v_cnt1 FROM information_schema.tables t WHERE EXISTS (SELECT REGEXP_MATCHES(s.table_name, '([A-Z]+)','g') FROM information_schema.tables s
        WHERE t.table_schema=s.table_schema AND t.table_name=s.table_name AND t.table_schema = in_schema AND t.table_name = in_table AND t.table_type = 'BASE TABLE');
        IF v_cnt1 > 0 THEN
          v_table_ddl := 'CREATE ' || v_temp || ' TABLE ' || in_schema || '."' || in_table || '" (' || E'\\n';
        ELSE
          v_table_ddl := 'CREATE ' || v_temp || ' TABLE ' || in_schema || '.' || in_table || ' (' || E'\\n';
        END IF;
      END IF;
      -- RAISE NOTICE 'DEBUG2: tabledef so far: %', v_table_ddl;
      -- define all of the columns in the table unless we are in progress creating an inheritance-based child table
      IF NOT bPartition THEN
        FOR v_colrec IN
          SELECT c.column_name, c.data_type, c.udt_name, c.udt_schema, c.character_maximum_length, c.is_nullable, c.column_default, c.numeric_precision, c.numeric_scale, c.is_identity, c.identity_generation, c.is_generated, c.generation_expression
          FROM information_schema.columns c WHERE (table_schema, table_name) = (in_schema, in_table) ORDER BY ordinal_position
        LOOP
          IF bVerbose THEN RAISE NOTICE '(col loop) name=%  type=%  udt_name=%  default=%  is_generated=%  gen_expr=%', v_colrec.column_name, v_colrec.data_type, v_colrec.udt_name, v_colrec.column_default, v_colrec.is_generated, v_colrec.generation_expression; END IF;

          -- v17 fix: handle case-sensitive for pg_get_serial_sequence that requires SQL Identifier handling
          -- SELECT CASE WHEN pg_get_serial_sequence(v_qualified, v_colrec.column_name) IS NOT NULL THEN True ELSE False END into bSerial;
          SELECT CASE WHEN pg_get_serial_sequence(quote_ident(in_schema) || '.' || quote_ident(in_table), v_colrec.column_name) IS NOT NULL THEN True ELSE False END into bSerial;
          IF bVerbose THEN
            -- v17 fix: handle case-sensitive for pg_get_serial_sequence that requires SQL Identifier handling
            -- SELECT pg_get_serial_sequence(v_qualified, v_colrec.column_name) into v_temp;
            SELECT pg_get_serial_sequence(quote_ident(in_schema) || '.' || quote_ident(in_table), v_colrec.column_name) into v_temp;
            IF v_temp IS NULL THEN v_temp = 'NA'; END IF;
            SELECT pg_temp.pg_get_coldef(in_schema, in_table,v_colrec.column_name) INTO v_diag1;
            RAISE NOTICE 'DEBUG table: %  Column: %  datatype: %  Serial=%  serialval=%  coldef=%', v_qualified, v_colrec.column_name, v_colrec.data_type, bSerial, v_temp, v_diag1;
            RAISE NOTICE 'DEBUG tabledef: %', v_table_ddl;
          END IF;

          --Issue#17 put double-quotes around case-sensitive column names
          SELECT COUNT(*) INTO v_cnt1 FROM information_schema.columns t WHERE EXISTS (SELECT REGEXP_MATCHES(s.column_name, '([A-Z]+)','g') FROM information_schema.columns s
          WHERE t.table_schema=s.table_schema and t.table_name=s.table_name and t.column_name=s.column_name AND t.table_schema = quote_ident(in_schema) AND column_name = v_colrec.column_name);

          --Issue#19 put double-quotes around SQL keyword column names
          SELECT COUNT(*) INTO v_cnt2 FROM pg_get_keywords() WHERE word = v_colrec.column_name AND catcode = 'R';

          IF v_cnt1 > 0 OR v_cnt2 > 0 THEN
            v_table_ddl := v_table_ddl || '  "' || v_colrec.column_name || '" ';
          ELSE
            v_table_ddl := v_table_ddl || '  ' || v_colrec.column_name || ' ';
          END IF;

          -- Issue#23: Handle autogenerated columns and rewrite as a simpler IF THEN ELSE branch instead of a much more complex embedded CASE STATEMENT
          IF v_colrec.is_generated = 'ALWAYS' and v_colrec.generation_expression IS NOT NULL THEN
              -- searchable tsvector GENERATED ALWAYS AS (to_tsvector('simple'::regconfig, COALESCE(translate(email, '@.-'::citext, ' '::text), ''::text)) ) STORED
              v_temp = v_colrec.data_type || ' GENERATED ALWAYS AS (' || v_colrec.generation_expression || ') STORED ';
          ELSEIF v_colrec.udt_name in ('geometry', 'box2d', 'box2df', 'box3d', 'geography', 'geometry_dump', 'gidx', 'spheroid', 'valid_detail') THEN
              v_temp = v_colrec.udt_name;
          ELSEIF v_colrec.data_type = 'USER-DEFINED' THEN
              v_temp = v_colrec.udt_schema || '.' || v_colrec.udt_name;
          ELSEIF v_colrec.data_type = 'ARRAY' THEN
                -- Issue#6 fix: handle arrays
              v_temp = pg_temp.pg_get_coldef(in_schema, in_table,v_colrec.column_name);
              -- v17 fix: handle case-sensitive for pg_get_serial_sequence that requires SQL Identifier handling
              -- WHEN pg_get_serial_sequence(v_qualified, v_colrec.column_name) IS NOT NULL
          ELSEIF pg_get_serial_sequence(quote_ident(in_schema) || '.' || quote_ident(in_table), v_colrec.column_name) IS NOT NULL THEN
              -- Issue#8 fix: handle serial. Note: NOT NULL is implied so no need to declare it explicitly
              v_temp = pg_temp.pg_get_coldef(in_schema, in_table,v_colrec.column_name);
          ELSE
              v_temp = v_colrec.data_type;
          END IF;
          -- RAISE NOTICE 'column def1=%', v_temp;

          -- handle IDENTITY columns
          IF v_colrec.is_identity = 'YES' THEN
              IF v_colrec.identity_generation = 'ALWAYS' THEN
                  v_temp = v_temp || ' GENERATED ALWAYS AS IDENTITY';
              ELSE
                  v_temp = v_temp || ' GENERATED BY DEFAULT AS IDENTITY';
              END IF;
          ELSEIF v_colrec.character_maximum_length IS NOT NULL THEN
              v_temp = v_temp || ('(' || v_colrec.character_maximum_length || ')');
          ELSEIF v_colrec.numeric_precision > 0 AND v_colrec.numeric_scale > 0 THEN
              v_temp = v_temp || '(' || v_colrec.numeric_precision || ',' || v_colrec.numeric_scale || ')';
          END IF;

          -- Handle NULL/NOT NULL
          IF bSerial THEN
              v_temp = v_temp || ' NOT NULL';
          ELSEIF v_colrec.is_nullable = 'NO' THEN
              v_temp = v_temp || ' NOT NULL';
          ELSEIF v_colrec.is_nullable = 'YES' THEN
              v_temp = v_temp || ' NULL';
          END IF;

          -- Handle defaults
          IF v_colrec.column_default IS NOT null AND NOT bSerial THEN
              -- RAISE NOTICE 'Setting default for column, %', v_colrec.column_name;
              v_temp = v_temp || (' DEFAULT ' || v_colrec.column_default);
          END IF;
          v_temp = v_temp || ',' || E'\\n';
          -- RAISE NOTICE 'column def2=%', v_temp;
          v_table_ddl := v_table_ddl || v_temp;
          -- RAISE NOTICE 'tabledef=%', v_table_ddl;

        END LOOP;
      END IF;
      IF bVerbose THEN RAISE NOTICE '(2)tabledef so far: %', v_table_ddl; END IF;

      -- define all the constraints: conparentid does not exist pre PGv11
      IF v_pgversion < 110000 THEN
        FOR v_constraintrec IN
          SELECT con.conname as constraint_name, con.contype as constraint_type,
            CASE
              WHEN con.contype = 'p' THEN 1 -- primary key constraint
              WHEN con.contype = 'u' THEN 2 -- unique constraint
              WHEN con.contype = 'f' THEN 3 -- foreign key constraint
              WHEN con.contype = 'c' THEN 4
              ELSE 5
            END as type_rank,
            pg_get_constraintdef(con.oid) as constraint_definition
          FROM pg_catalog.pg_constraint con JOIN pg_catalog.pg_class rel ON rel.oid = con.conrelid JOIN pg_catalog.pg_namespace nsp ON nsp.oid = connamespace
          WHERE nsp.nspname = in_schema AND rel.relname = in_table ORDER BY type_rank
        LOOP
          v_constraint_name := v_constraintrec.constraint_name;
          v_constraint_def  := v_constraintrec.constraint_definition;
          IF v_constraintrec.type_rank = 1 THEN
              IF pkcnt = 0 OR pktype = 'PKEY_INTERNAL' THEN
                  -- internal def
                  v_constraint_name := v_constraintrec.constraint_name;
                  v_constraint_def  := v_constraintrec.constraint_definition;
                  v_table_ddl := v_table_ddl || '  ' -- note: two char spacer to start, to indent the column
                    || 'CONSTRAINT' || ' '
                    || v_constraint_name || ' '
                    || v_constraint_def
                    || ',' || E'\\n';
              ELSE
                -- Issue#16 handle external PG def
                SELECT 'ALTER TABLE ONLY ' || in_schema || '.' || c.relname || ' ADD CONSTRAINT ' || r.conname || ' ' || pg_catalog.pg_get_constraintdef(r.oid, true) || ';' INTO v_pkey_def
                FROM pg_catalog.pg_constraint r, pg_class c, pg_namespace n where r.conrelid = c.oid and  r.contype = 'p' and n.oid = r.connamespace and n.nspname = in_schema AND c.relname = in_table and r.conname = v_constraint_name;
              END IF;
              IF bPartition THEN
                continue;
              END IF;
          ELSIF v_constraintrec.type_rank = 3 THEN
              -- handle foreign key constraints
              --Issue#22 fix: added FKEY_NONE check
              IF fktype = 'FKEYS_NONE' THEN
                  -- skip
                  continue;
              ELSIF fkcnt = 0 OR fktype = 'FKEYS_INTERNAL' THEN
                  -- internal def
                  v_table_ddl := v_table_ddl || '  ' -- note: two char spacer to start, to indent the column
                    || 'CONSTRAINT' || ' '
                    || v_constraint_name || ' '
                    || v_constraint_def
                    || ',' || E'\\n';
              ELSE
                  -- external def
                  SELECT 'ALTER TABLE ONLY ' || n.nspname || '.' || c2.relname || ' ADD CONSTRAINT ' || r.conname || ' ' || pg_catalog.pg_get_constraintdef(r.oid, true) || ';' INTO v_fkey_def
                  FROM pg_constraint r, pg_class c1, pg_namespace n, pg_class c2 where r.conrelid = c1.oid and  r.contype = 'f' and n.nspname = in_schema and n.oid = r.connamespace and r.conrelid = c2.oid and c2.relname = in_table;
                  v_fkey_defs = v_fkey_defs || v_fkey_def || E'\\n';
              END IF;
          ELSE
              -- handle all other constraints besides PKEY and FKEYS as internal defs by default
              v_table_ddl := v_table_ddl || '  ' -- note: two char spacer to start, to indent the column
                || 'CONSTRAINT' || ' '
                || v_constraint_name || ' '
                || v_constraint_def
                || ',' || E'\\n';
          END IF;
          if bVerbose THEN RAISE NOTICE 'DEBUG4: constraint name=% constraint_def=%', v_constraint_name,v_constraint_def; END IF;
          constraintarr := constraintarr || v_constraintrec.constraint_name:: text;

        END LOOP;
      ELSE
        -- handle PG versions 11 and up
        -- Issue#20: Fix logic for external PKEY and FKEYS
        FOR v_constraintrec IN
          SELECT con.conname as constraint_name, con.contype as constraint_type,
            CASE
              WHEN con.contype = 'p' THEN 1 -- primary key constraint
              WHEN con.contype = 'u' THEN 2 -- unique constraint
              WHEN con.contype = 'f' THEN 3 -- foreign key constraint
              WHEN con.contype = 'c' THEN 4
              ELSE 5
            END as type_rank,
            pg_get_constraintdef(con.oid) as constraint_definition
          FROM pg_catalog.pg_constraint con JOIN pg_catalog.pg_class rel ON rel.oid = con.conrelid JOIN pg_catalog.pg_namespace nsp ON nsp.oid = connamespace
          WHERE nsp.nspname = in_schema AND rel.relname = in_table
                --Issue#13 added this condition:
                AND con.conparentid = 0
                ORDER BY type_rank
        LOOP
          v_constraint_name := v_constraintrec.constraint_name;
          v_constraint_def  := v_constraintrec.constraint_definition;
          IF v_constraintrec.type_rank = 1 THEN
              IF pkcnt = 0 OR pktype = 'PKEY_INTERNAL' THEN
                  -- internal def
                  v_constraint_name := v_constraintrec.constraint_name;
                  v_constraint_def  := v_constraintrec.constraint_definition;
                  v_table_ddl := v_table_ddl || '  ' -- note: two char spacer to start, to indent the column
                    || 'CONSTRAINT' || ' '
                    || v_constraint_name || ' '
                    || v_constraint_def
                    || ',' || E'\\n';
              ELSE
                -- Issue#16 handle external PG def
                SELECT 'ALTER TABLE ONLY ' || in_schema || '.' || c.relname || ' ADD CONSTRAINT ' || r.conname || ' ' || pg_catalog.pg_get_constraintdef(r.oid, true) || ';' INTO v_pkey_def
                FROM pg_catalog.pg_constraint r, pg_class c, pg_namespace n where r.conrelid = c.oid and  r.contype = 'p' and n.oid = r.connamespace and n.nspname = in_schema AND c.relname = in_table;
              END IF;
              IF bPartition THEN
                continue;
              END IF;
          ELSIF v_constraintrec.type_rank = 3 THEN
              -- handle foreign key constraints
              --Issue#22 fix: added FKEY_NONE check
              IF fktype = 'FKEYS_NONE' THEN
                  -- skip
                  continue;
              ELSIF fkcnt = 0 OR fktype = 'FKEYS_INTERNAL' THEN
                  -- internal def
                  v_table_ddl := v_table_ddl || '  ' -- note: two char spacer to start, to indent the column
                    || 'CONSTRAINT' || ' '
                    || v_constraint_name || ' '
                    || v_constraint_def
                    || ',' || E'\\n';
              ELSE
                  -- external def
                  SELECT 'ALTER TABLE ONLY ' || n.nspname || '.' || c2.relname || ' ADD CONSTRAINT ' || r.conname || ' ' || pg_catalog.pg_get_constraintdef(r.oid, true) || ';' INTO v_fkey_def
                  FROM pg_constraint r, pg_class c1, pg_namespace n, pg_class c2 where r.conrelid = c1.oid and  r.contype = 'f' and n.nspname = in_schema and n.oid = r.connamespace and r.conrelid = c2.oid and c2.relname = in_table and
                  r.conname = v_constraint_name and r.conparentid = 0;
                  v_fkey_defs = v_fkey_defs || v_fkey_def || E'\\n';
              END IF;
          ELSE
              -- handle all other constraints besides PKEY and FKEYS as internal defs by default
              v_table_ddl := v_table_ddl || '  ' -- note: two char spacer to start, to indent the column
                || 'CONSTRAINT' || ' '
                || v_constraint_name || ' '
                || v_constraint_def
                || ',' || E'\\n';
          END IF;
          if bVerbose THEN RAISE NOTICE 'DEBUG4: constraint name=% constraint_def=%', v_constraint_name,v_constraint_def; END IF;
          constraintarr := constraintarr || v_constraintrec.constraint_name:: text;

        END LOOP;
      END IF;

      -- drop the last comma before ending the create statement, which should be right before the carriage return character
      -- Issue#24: make sure the comma is there before removing it
      select substring(v_table_ddl, length(v_table_ddl) - 1, 1) INTO v_temp;
      IF v_temp = ',' THEN
          v_table_ddl = substr(v_table_ddl, 0, length(v_table_ddl) - 1) || E'\\n';
      END IF;
      IF bVerbose THEN RAISE NOTICE '(3)tabledef so far: %', trim(v_table_ddl); END IF;

      -- ---------------------------------------------------------------------------
      -- at this point we have everything up to the last table-enclosing parenthesis
      -- ---------------------------------------------------------------------------
      IF bVerbose THEN RAISE NOTICE '(4)tabledef so far: %', v_table_ddl; END IF;

      -- See if this is an inheritance-based child table and finish up the table create.
      IF bPartition and bInheritance THEN
        -- Issue#11: handle parent schema
        -- v_table_ddl := v_table_ddl || ') INHERITS (' || in_schema || '.' || v_parent || ') ' || E'\\n' || v_relopts || ' ' || v_tablespace || ';' || E'\\n';
        IF v_parent_schema = '' OR v_parent_schema IS NULL THEN v_parent_schema = in_schema; END IF;
        v_table_ddl := v_table_ddl || ') INHERITS (' || v_parent_schema || '.' || v_parent || ') ' || E'\\n' || v_relopts || ' ' || v_tablespace || ';' || E'\\n';
      END IF;

      IF v_pgversion >= 100000 AND NOT bPartition and NOT bInheritance THEN
        -- See if this is a partitioned table (pg_class.relkind = 'p') and add the partitioned key
        SELECT pg_get_partkeydef(c1.oid) as partition_key INTO v_partition_key FROM pg_class c1 JOIN pg_namespace n ON (n.oid = c1.relnamespace) LEFT JOIN pg_partitioned_table p ON (c1.oid = p.partrelid)
        WHERE n.nspname = in_schema and n.oid = c1.relnamespace and c1.relname = in_table and c1.relkind = 'p';

        IF v_partition_key IS NOT NULL AND v_partition_key <> '' THEN
          -- add partition clause
          -- NOTE:  cannot specify default tablespace for partitioned relations
          -- v_table_ddl := v_table_ddl || ') PARTITION BY ' || v_partition_key || ' ' || v_tablespace || ';' || E'\\n';
          v_table_ddl := v_table_ddl || ') PARTITION BY ' || v_partition_key || ';' || E'\\n';
        ELSEIF v_relopts <> '' THEN
          v_table_ddl := v_table_ddl || ') ' || v_relopts || ' ' || v_tablespace || ';' || E'\\n';
        ELSE
          -- end the create definition
          v_table_ddl := v_table_ddl || ') ' || v_tablespace || ';' || E'\\n';
        END IF;
      END IF;

      IF bVerbose THEN RAISE NOTICE '(5)tabledef so far: %', v_table_ddl; END IF;

      -- Add closing paren for regular tables
      -- IF NOT bPartition THEN
      -- v_table_ddl := v_table_ddl || ') ' || v_relopts || ' ' || v_tablespace || E';\\n';
      -- END IF;
      -- RAISE NOTICE 'ddlsofar3: %', v_table_ddl;

      -- Issue#16 create the external PKEY def if indicated
      IF v_pkey_def <> '' THEN
          v_table_ddl := v_table_ddl || v_pkey_def || E'\\n';
      END IF;

      -- Issue#20
      IF v_fkey_defs <> '' THEN
            v_table_ddl := v_table_ddl || v_fkey_defs || E'\\n';
      END IF;

      IF bVerbose THEN RAISE NOTICE '(6)tabledef so far: %', v_table_ddl; END IF;

      -- create indexes
      FOR v_indexrec IN
        SELECT indexdef, COALESCE(tablespace, 'pg_default') as tablespace, indexname FROM pg_indexes WHERE (schemaname, tablename) = (in_schema, in_table)
      LOOP
        -- RAISE NOTICE 'DEBUG6: indexname=%  indexdef=%', v_indexrec.indexname, v_indexrec.indexdef;
        -- loop through constraints and skip ones already defined
        bSkip = False;
        FOREACH constraintelement IN ARRAY constraintarr
        LOOP
          IF constraintelement = v_indexrec.indexname THEN
              -- RAISE NOTICE 'DEBUG7: skipping index, %', v_indexrec.indexname;
              bSkip = True;
              EXIT;
          END IF;
        END LOOP;
        if bSkip THEN CONTINUE; END IF;

        -- Add IF NOT EXISTS clause so partition index additions will not be created if declarative partition in effect and index already created on parent
        v_indexrec.indexdef := REPLACE(v_indexrec.indexdef, 'CREATE INDEX', 'CREATE INDEX IF NOT EXISTS');
        -- Fix Issue#26: do it for unique/primary key indexes as well
        v_indexrec.indexdef := REPLACE(v_indexrec.indexdef, 'CREATE UNIQUE INDEX', 'CREATE UNIQUE INDEX IF NOT EXISTS');
        -- RAISE NOTICE 'DEBUG8: adding index, %', v_indexrec.indexname;

        -- NOTE:  cannot specify default tablespace for partitioned relations
        IF v_partition_key IS NOT NULL AND v_partition_key <> '' THEN
            v_table_ddl := v_table_ddl || v_indexrec.indexdef || ';' || E'\\n';
        ELSE
            -- Issue#25: see if partial index or not
            select CASE WHEN i.indpred IS NOT NULL THEN True ELSE False END INTO v_partial
            FROM pg_index i JOIN pg_class c1 ON (i.indexrelid = c1.oid) JOIN pg_class c2 ON (i.indrelid = c2.oid)
            WHERE c1.relnamespace::regnamespace::text = in_schema AND c2.relnamespace::regnamespace::text = in_schema AND c2.relname = in_table AND c1.relname = v_indexrec.indexname;
            IF v_partial THEN
                -- Put tablespace def before WHERE CLAUSE
                v_temp = v_indexrec.indexdef;
                v_pos = POSITION(' WHERE ' IN v_temp);
                v_temp2 = SUBSTRING(v_temp, v_pos);
                v_temp  = SUBSTRING(v_temp, 1, v_pos);
                v_table_ddl := v_table_ddl || v_temp || ' TABLESPACE ' || v_indexrec.tablespace || v_temp2 || ';' || E'\\n';
            ELSE
                v_table_ddl := v_table_ddl || v_indexrec.indexdef || ' TABLESPACE ' || v_indexrec.tablespace || ';' || E'\\n';
            END IF;
        END IF;

      END LOOP;
      IF bVerbose THEN RAISE NOTICE '(7)tabledef so far: %', v_table_ddl; END IF;

      -- Issue#20: added logic for table and column comments
      IF  cmtcnt > 0 THEN
          FOR v_rec IN
            SELECT c.relname, 'COMMENT ON ' || CASE WHEN c.relkind in ('r','p') AND a.attname IS NULL THEN 'TABLE ' WHEN c.relkind in ('r','p') AND a.attname IS NOT NULL THEN 'COLUMN ' WHEN c.relkind = 'f' THEN 'FOREIGN TABLE '
                  WHEN c.relkind = 'm' THEN 'MATERIALIZED VIEW ' WHEN c.relkind = 'v' THEN 'VIEW ' WHEN c.relkind = 'i' THEN 'INDEX ' WHEN c.relkind = 'S' THEN 'SEQUENCE ' ELSE 'XX' END || n.nspname || '.' ||
                  CASE WHEN c.relkind in ('r','p') AND a.attname IS NOT NULL THEN quote_ident(c.relname) || '.' || a.attname ELSE quote_ident(c.relname) END || ' IS '   || quote_literal(d.description) || ';' as ddl
            FROM pg_class c JOIN pg_namespace n ON (n.oid = c.relnamespace) LEFT JOIN pg_description d ON (c.oid = d.objoid) LEFT JOIN pg_attribute a ON (c.oid = a.attrelid AND a.attnum > 0 and a.attnum = d.objsubid)
            WHERE d.description IS NOT NULL AND n.nspname = in_schema AND c.relname = in_table ORDER BY 2 desc, ddl
          LOOP
              --RAISE NOTICE 'comments:%', v_rec.ddl;
              v_table_ddl = v_table_ddl || v_rec.ddl || E'\\n';
          END LOOP;
      END IF;
      IF bVerbose THEN RAISE NOTICE '(8)tabledef so far: %', v_table_ddl; END IF;

      IF trigtype = 'INCLUDE_TRIGGERS' THEN
        -- Issue#14: handle multiple triggers for a table
        FOR v_trigrec IN
            select pg_get_triggerdef(t.oid, True) || ';' as triggerdef FROM pg_trigger t, pg_class c, pg_namespace n
            WHERE n.nspname = in_schema and n.oid = c.relnamespace and c.relname = in_table and c.relkind = 'r' and t.tgrelid = c.oid and NOT t.tgisinternal
        LOOP
            v_table_ddl := v_table_ddl || v_trigrec.triggerdef;
            v_table_ddl := v_table_ddl || E'\\n';
            IF bVerbose THEN RAISE NOTICE 'triggerdef = %', v_trigrec.triggerdef; END IF;
        END LOOP;
      END IF;

      IF bVerbose THEN RAISE NOTICE '(9)tabledef so far: %', v_table_ddl; END IF;
      -- add empty line
      v_table_ddl := v_table_ddl || E'\\n';
      IF bVerbose THEN RAISE NOTICE '(10)tabledef so far: %', v_table_ddl; END IF;

      -- reset search_path back to what it was
      IF search_path_old = '' THEN
        SELECT set_config('search_path', '', false) into v_temp;
      ELSE
        EXECUTE 'SET search_path = ' || search_path_old;
      END IF;

      RETURN v_table_ddl;

      EXCEPTION
      WHEN others THEN
      BEGIN
        GET STACKED DIAGNOSTICS v_diag1 = MESSAGE_TEXT, v_diag2 = PG_EXCEPTION_DETAIL, v_diag3 = PG_EXCEPTION_HINT, v_diag4 = RETURNED_SQLSTATE, v_diag5 = PG_CONTEXT, v_diag6 = PG_EXCEPTION_CONTEXT;
        -- v_ret := 'line=' || v_diag6 || '. '|| v_diag4 || '. ' || v_diag1 || ' .' || v_diag2 || ' .' || v_diag3;
        v_ret := 'line=' || v_diag6 || '. '|| v_diag4 || '. ' || v_diag1;
        RAISE EXCEPTION '%', v_ret;
        -- put additional coding here if necessarY
        RETURN '';
      END;

    END;
  $$;`,tE=p`
  DROP TYPE IF EXISTS pg_temp.tabledefs CASCADE;
  CREATE TYPE pg_temp.tabledefs AS ENUM ('PKEY_INTERNAL','PKEY_EXTERNAL','FKEYS_INTERNAL', 'FKEYS_EXTERNAL', 'COMMENTS', 'FKEYS_NONE', 'INCLUDE_TRIGGERS', 'NO_TRIGGERS');

  -- SELECT * FROM pg_temp.pg_get_coldef('sample','orders','id');
  -- DROP FUNCTION pg_temp.pg_get_coldef(text,text,text,boolean);
  CREATE OR REPLACE FUNCTION pg_temp.pg_get_coldef(
    in_schema text,
    in_table  text,
    in_column text,
    oldway    boolean default False
  )
  RETURNS text
  LANGUAGE plpgsql VOLATILE
  AS
  $$
  DECLARE
  v_coldef     text;
  v_dt1        text;
  v_dt2        text;
  v_dt3        text;
  v_nullable   boolean;
  v_position   int;
  v_identity   text;
  v_generated  text;
  v_hasdflt    boolean;
  v_dfltexpr   text;

  BEGIN
    IF oldway THEN
      SELECT pg_catalog.format_type(a.atttypid, a.atttypmod) INTO v_coldef FROM pg_namespace n, pg_class c, pg_attribute a, pg_type t
      WHERE n.nspname = in_schema AND n.oid = c.relnamespace AND c.relname = in_table AND a.attname = in_column and a.attnum > 0 AND a.attrelid = c.oid AND a.atttypid = t.oid ORDER BY a.attnum;
      -- RAISE NOTICE 'DEBUG: oldway=%',v_coldef;
    ELSE
      -- a.attrelid::regclass::text, a.attname
      SELECT CASE WHEN a.atttypid = ANY ('{int,int8,int2}'::regtype[]) AND EXISTS (SELECT FROM pg_attrdef ad WHERE ad.adrelid = a.attrelid AND ad.adnum   = a.attnum AND
      pg_get_expr(ad.adbin, ad.adrelid) = 'nextval(''' || (pg_get_serial_sequence (a.attrelid::regclass::text, a.attname))::regclass || '''::regclass)') THEN CASE a.atttypid
      WHEN 'int'::regtype  THEN 'serial' WHEN 'int8'::regtype THEN 'bigserial' WHEN 'int2'::regtype THEN 'smallserial' END ELSE format_type(a.atttypid, a.atttypmod) END AS data_type
      INTO v_coldef FROM pg_namespace n, pg_class c, pg_attribute a, pg_type t
      WHERE n.nspname = in_schema AND n.oid = c.relnamespace AND c.relname = in_table AND a.attname = in_column and a.attnum > 0 AND a.attrelid = c.oid AND a.atttypid = t.oid ORDER BY a.attnum;
      -- RAISE NOTICE 'DEBUG: newway=%',v_coldef;

      -- Issue#24: not implemented yet
      -- might replace with this below to do more detailed parsing...
      -- SELECT a.atttypid::regtype AS dt1, format_type(a.atttypid, a.atttypmod) as dt2, t.typname as dt3, CASE WHEN not(a.attnotnull) THEN True ELSE False END AS nullable,
      -- a.attnum, a.attidentity, a.attgenerated, a.atthasdef, pg_get_expr(ad.adbin, ad.adrelid) dfltexpr
      -- INTO v_dt1, v_dt2, v_dt3, v_nullable, v_position, v_identity, v_generated, v_hasdflt, v_dfltexpr
      -- FROM pg_attribute a JOIN pg_class c ON (a.attrelid = c.oid) JOIN pg_type t ON (a.atttypid = t.oid) LEFT JOIN pg_attrdef ad ON (a.attrelid = ad.adrelid AND a.attnum = ad.adnum)
      -- WHERE c.relkind in ('r','p') AND a.attnum > 0 AND NOT a.attisdropped AND c.relnamespace::regnamespace::text = in_schema AND c.relname = in_table AND a.attname = in_column;
      -- RAISE NOTICE 'schema=%  table=%  column=%  dt1=%  dt2=%  dt3=%  nullable=%  pos=%  identity=%   generated=%  HasDefault=%  DeftExpr=%', in_schema, in_table, in_column, v_dt1,v_dt2,v_dt3,v_nullable,v_position,v_identity,v_generated,v_hasdflt,v_dfltexpr;
    END IF;
    RETURN v_coldef;
  END;
  $$;

  -- SELECT * FROM pg_temp.pg_get_tabledef('sample', 'address', false);
  DROP FUNCTION IF EXISTS pg_temp.pg_get_tabledef(character varying,character varying,boolean,tabledefs[]);
  CREATE OR REPLACE FUNCTION pg_temp.pg_get_tabledef(
    in_schema varchar,
    in_table varchar,
    _verbose boolean,
    VARIADIC arr pg_temp.tabledefs[] DEFAULT '{}':: pg_temp.tabledefs[]
  )
  RETURNS text
  LANGUAGE plpgsql VOLATILE
  AS
  $$
    DECLARE
      v_qualified text := '';
      v_table_ddl text;
      v_table_oid int;
      v_colrec record;
      v_constraintrec record;
      v_trigrec       record;
      v_indexrec record;
      v_rec           record;
      v_constraint_name text;
      v_constraint_def  text;
      v_pkey_def        text := '';
      v_fkey_def        text := '';
      v_fkey_defs       text := '';
      v_trigger text := '';
      v_partition_key text := '';
      v_partbound text;
      v_parent text;
      v_parent_schema text;
      v_persist text;
      v_temp  text := '';
      v_temp2 text;
      v_relopts text;
      v_tablespace text;
      v_pgversion int;
      bSerial boolean;
      bPartition boolean;
      bInheritance boolean;
      bRelispartition boolean;
      constraintarr text[] := '{}';
      constraintelement text;
      bSkip boolean;
      bVerbose boolean := False;
      v_cnt1   integer;
      v_cnt2   integer;
      search_path_old text := '';
      search_path_new text := '';
      v_partial    boolean;
      v_pos        integer;

      -- assume defaults for ENUMs at the getgo
      pkcnt            int := 0;
      fkcnt            int := 0;
      trigcnt          int := 0;
      cmtcnt           int := 0;
      pktype           pg_temp.tabledefs := 'PKEY_INTERNAL';
      fktype           pg_temp.tabledefs := 'FKEYS_INTERNAL';
      trigtype         pg_temp.tabledefs := 'NO_TRIGGERS';
      arglen           integer;
      vargs            text;
      avarg            pg_temp.tabledefs;

      -- exception variables
      v_ret            text;
      v_diag1          text;
      v_diag2          text;
      v_diag3          text;
      v_diag4          text;
      v_diag5          text;
      v_diag6          text;

    BEGIN
      SET client_min_messages = 'notice';
      IF _verbose THEN bVerbose = True; END IF;

      -- v17 fix: handle case-sensitive
      -- v_qualified = in_schema || '.' || in_table;

      arglen := array_length($4, 1);
      IF arglen IS NULL THEN
          -- nothing to do, so assume defaults
          NULL;
      ELSE
          -- loop thru args
          -- IF 'NO_TRIGGERS' = ANY ($4)
          -- select array_to_string($4, ',', '***') INTO vargs;
          IF bVerbose THEN RAISE NOTICE 'arguments=%', $4; END IF;
          FOREACH avarg IN ARRAY $4 LOOP
              IF bVerbose THEN RAISE NOTICE 'arg=%', avarg; END IF;
              IF avarg = 'FKEYS_INTERNAL' OR avarg = 'FKEYS_EXTERNAL' OR avarg = 'FKEYS_NONE' THEN
                  fkcnt = fkcnt + 1;
                  fktype = avarg;
              ELSEIF avarg = 'INCLUDE_TRIGGERS' OR avarg = 'NO_TRIGGERS' THEN
                  trigcnt = trigcnt + 1;
                  trigtype = avarg;
              ELSEIF avarg = 'PKEY_EXTERNAL' THEN
                  pkcnt = pkcnt + 1;
                  pktype = avarg;
              ELSEIF avarg = 'COMMENTS' THEN
                  cmtcnt = cmtcnt + 1;

              END IF;
          END LOOP;
          IF fkcnt > 1 THEN
              RAISE WARNING 'Only one foreign key option can be provided. You provided %', fkcnt;
              RETURN '';
          ELSEIF trigcnt > 1 THEN
              RAISE WARNING 'Only one trigger option can be provided. You provided %', trigcnt;
              RETURN '';
          ELSEIF pkcnt > 1 THEN
              RAISE WARNING 'Only one pkey option can be provided. You provided %', pkcnt;
              RETURN '';
          ELSEIF cmtcnt > 1 THEN
              RAISE WARNING 'Only one comments option can be provided. You provided %', cmtcnt;
              RETURN '';

          END IF;
      END IF;

      SELECT c.oid, (select setting from pg_settings where name = 'server_version_num') INTO v_table_oid, v_pgversion FROM pg_catalog.pg_class c LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
      WHERE c.relkind in ('r','p') AND c.relname = in_table AND n.nspname = in_schema;

    -- set search_path = public before we do anything to force explicit schema qualification but dont forget to set it back before exiting...
      SELECT setting INTO search_path_old FROM pg_settings WHERE name = 'search_path';

      -- RAISE NOTICE 'DEBUG tableddl: saving old search_path: ***%***', search_path_old;
      EXECUTE 'SET search_path = "public"';
      SELECT setting INTO search_path_new FROM pg_settings WHERE name = 'search_path';
      -- RAISE NOTICE 'DEBUG tableddl: using new search path=***%***', search_path_new;

      -- throw an error if table was not found
      IF (v_table_oid IS NULL) THEN
        RAISE EXCEPTION 'table does not exist';
      END IF;

      -- get user-defined tablespaces if applicable
      SELECT tablespace INTO v_temp FROM pg_tables WHERE schemaname = in_schema and tablename = in_table and tablespace IS NOT NULL;
      IF v_temp IS NULL THEN
        v_tablespace := 'TABLESPACE pg_default';
      ELSE
        v_tablespace := 'TABLESPACE ' || v_temp;
      END IF;

      -- also see if there are any SET commands for this table, ie, autovacuum_enabled=off, fillfactor=70
      WITH relopts AS (SELECT unnest(c.reloptions) relopts FROM pg_class c, pg_namespace n WHERE n.nspname = in_schema and n.oid = c.relnamespace and c.relname = in_table)
      SELECT string_agg(r.relopts, ', ') as relopts INTO v_temp from relopts r;
      IF v_temp IS NULL THEN
        v_relopts := '';
      ELSE
        v_relopts := ' WITH (' || v_temp || ')';
      END IF;

      -- -----------------------------------------------------------------------------------
      -- Create table defs for partitions/children using inheritance or declarative methods.
      -- inheritance: pg_class.relkind = 'r'   pg_class.relispartition=false   pg_class.relpartbound is NULL
      -- declarative: pg_class.relkind = 'r'   pg_class.relispartition=true    pg_class.relpartbound is NOT NULL
      -- -----------------------------------------------------------------------------------
      v_partbound := '';
      bPartition := False;
      bInheritance := False;
      IF v_pgversion < 100000 THEN
        -- Issue#11: handle parent schema
        SELECT c2.relname parent, c2.relnamespace::regnamespace INTO v_parent, v_parent_schema from pg_class c1, pg_namespace n, pg_inherits i, pg_class c2
        WHERE n.nspname = in_schema and n.oid = c1.relnamespace and c1.relname = in_table and c1.oid = i.inhrelid and i.inhparent = c2.oid and c1.relkind = 'r';
        IF (v_parent IS NOT NULL) THEN
          bPartition   := True;
          bInheritance := True;
        END IF;
      ELSE
        -- Issue#11: handle parent schema
        SELECT c2.relname parent, c1.relispartition, pg_get_expr(c1.relpartbound, c1.oid, true), c2.relnamespace::regnamespace INTO v_parent, bRelispartition, v_partbound, v_parent_schema from pg_class c1, pg_namespace n, pg_inherits i, pg_class c2
        WHERE n.nspname = in_schema and n.oid = c1.relnamespace and c1.relname = in_table and c1.oid = i.inhrelid and i.inhparent = c2.oid and c1.relkind = 'r';
        IF (v_parent IS NOT NULL) THEN
          bPartition   := True;
          IF bRelispartition THEN
            bInheritance := False;
          ELSE
            bInheritance := True;
          END IF;
        END IF;
      END IF;
      IF bPartition THEN
        --Issue#17 fix for case-sensitive tables
        -- Supabase perf fix: the original scanned all of information_schema.tables (O(catalog) with
        -- per-row privilege checks) just to detect uppercase in the table name; the name is already
        -- in hand, so test it directly. The table's existence was validated above via v_table_oid.
        -- SELECT count(*) INTO v_cnt1 FROM information_schema.tables t WHERE EXISTS (SELECT REGEXP_MATCHES(s.table_name, '([A-Z]+)','g') FROM information_schema.tables s
        -- WHERE t.table_schema=s.table_schema AND t.table_name=s.table_name AND t.table_schema = in_schema AND t.table_name = in_table AND t.table_type = 'BASE TABLE');
        v_cnt1 := CASE WHEN in_table ~ '[A-Z]' THEN 1 ELSE 0 END;

        --Issue#19 put double-quotes around SQL keyword column names
        -- Issue#121: fix keyword lookup for table name not column name that does not apply here
        -- SELECT COUNT(*) INTO v_cnt2 FROM pg_get_keywords() WHERE word = v_colrec.column_name AND catcode = 'R';
        SELECT COUNT(*) INTO v_cnt2 FROM pg_get_keywords() WHERE word = in_table AND catcode = 'R';

        IF bInheritance THEN
          -- inheritance-based
          IF v_cnt1 > 0 OR v_cnt2 > 0 THEN
            v_table_ddl := 'CREATE TABLE ' || in_schema || '."' || in_table || '"( '|| E'\\n';
          ELSE
            v_table_ddl := 'CREATE TABLE ' || in_schema || '.' || in_table || '( '|| E'\\n';
          END IF;

          -- Jump to constraints section to add the check constraints
        ELSE
          -- declarative-based
          IF v_relopts <> '' THEN
            IF v_cnt1 > 0 OR v_cnt2 > 0 THEN
              v_table_ddl := 'CREATE TABLE ' || in_schema || '."' || in_table || '" PARTITION OF ' || in_schema || '.' || v_parent || ' ' || v_partbound || v_relopts || ' ' || v_tablespace || '; ' || E'\\n';
            ELSE
              v_table_ddl := 'CREATE TABLE ' || in_schema || '.' || in_table || ' PARTITION OF ' || in_schema || '.' || v_parent || ' ' || v_partbound || v_relopts || ' ' || v_tablespace || '; ' || E'\\n';
            END IF;
          ELSE
            IF v_cnt1 > 0 OR v_cnt2 > 0 THEN
              v_table_ddl := 'CREATE TABLE ' || in_schema || '."' || in_table || '" PARTITION OF ' || in_schema || '.' || v_parent || ' ' || v_partbound || ' ' || v_tablespace || '; ' || E'\\n';
            ELSE
              v_table_ddl := 'CREATE TABLE ' || in_schema || '.' || in_table || ' PARTITION OF ' || in_schema || '.' || v_parent || ' ' || v_partbound || ' ' || v_tablespace || '; ' || E'\\n';
            END IF;
          END IF;
          -- Jump to constraints and index section to add the check constraints and indexes and perhaps FKeys
        END IF;
      END IF;
      IF bVerbose THEN RAISE NOTICE '(1)tabledef so far: %', v_table_ddl; END IF;

      IF NOT bPartition THEN
        -- see if this is unlogged or temporary table
        select c.relpersistence into v_persist from pg_class c, pg_namespace n where n.nspname = in_schema and n.oid = c.relnamespace and c.relname = in_table and c.relkind = 'r';
        IF v_persist = 'u' THEN
          v_temp := 'UNLOGGED';
        ELSIF v_persist = 't' THEN
          v_temp := 'TEMPORARY';
        ELSE
          v_temp := '';
        END IF;
      END IF;

      -- start the create definition for regular tables unless we are in progress creating an inheritance-based child table
      IF NOT bPartition THEN
        --Issue#17 fix for case-sensitive tables
        -- Supabase perf fix: same as the partition branch above — replace the O(catalog)
        -- information_schema.tables scan with a direct uppercase test on the known table name.
        -- SELECT count(*) INTO v_cnt1 FROM information_schema.tables t WHERE EXISTS (SELECT REGEXP_MATCHES(s.table_name, '([A-Z]+)','g') FROM information_schema.tables s
        -- WHERE t.table_schema=s.table_schema AND t.table_name=s.table_name AND t.table_schema = in_schema AND t.table_name = in_table AND t.table_type = 'BASE TABLE');
        v_cnt1 := CASE WHEN in_table ~ '[A-Z]' THEN 1 ELSE 0 END;
        IF v_cnt1 > 0 THEN
          v_table_ddl := 'CREATE ' || v_temp || ' TABLE ' || in_schema || '."' || in_table || '" (' || E'\\n';
        ELSE
          v_table_ddl := 'CREATE ' || v_temp || ' TABLE ' || in_schema || '.' || in_table || ' (' || E'\\n';
        END IF;
      END IF;
      -- RAISE NOTICE 'DEBUG2: tabledef so far: %', v_table_ddl;
      -- define all of the columns in the table unless we are in progress creating an inheritance-based child table
      IF NOT bPartition THEN
        FOR v_colrec IN
          SELECT c.column_name, c.data_type, c.udt_name, c.udt_schema, c.character_maximum_length, c.is_nullable, c.column_default, c.numeric_precision, c.numeric_scale, c.is_identity, c.identity_generation, c.is_generated, c.generation_expression
          FROM information_schema.columns c WHERE (table_schema, table_name) = (in_schema, in_table) ORDER BY ordinal_position
        LOOP
          IF bVerbose THEN RAISE NOTICE '(col loop) name=%  type=%  udt_name=%  default=%  is_generated=%  gen_expr=%', v_colrec.column_name, v_colrec.data_type, v_colrec.udt_name, v_colrec.column_default, v_colrec.is_generated, v_colrec.generation_expression; END IF;

          -- v17 fix: handle case-sensitive for pg_get_serial_sequence that requires SQL Identifier handling
          -- SELECT CASE WHEN pg_get_serial_sequence(v_qualified, v_colrec.column_name) IS NOT NULL THEN True ELSE False END into bSerial;
          SELECT CASE WHEN pg_get_serial_sequence(quote_ident(in_schema) || '.' || quote_ident(in_table), v_colrec.column_name) IS NOT NULL THEN True ELSE False END into bSerial;
          IF bVerbose THEN
            -- v17 fix: handle case-sensitive for pg_get_serial_sequence that requires SQL Identifier handling
            -- SELECT pg_get_serial_sequence(v_qualified, v_colrec.column_name) into v_temp;
            SELECT pg_get_serial_sequence(quote_ident(in_schema) || '.' || quote_ident(in_table), v_colrec.column_name) into v_temp;
            IF v_temp IS NULL THEN v_temp = 'NA'; END IF;
            SELECT pg_temp.pg_get_coldef(in_schema, in_table,v_colrec.column_name) INTO v_diag1;
            RAISE NOTICE 'DEBUG table: %  Column: %  datatype: %  Serial=%  serialval=%  coldef=%', v_qualified, v_colrec.column_name, v_colrec.data_type, bSerial, v_temp, v_diag1;
            RAISE NOTICE 'DEBUG tabledef: %', v_table_ddl;
          END IF;

          --Issue#17 put double-quotes around case-sensitive column names
          -- Supabase perf fix: the original scanned all of information_schema.columns (O(total
          -- columns in the database), with per-row privilege checks) PER COLUMN just to detect
          -- uppercase in the column name — the dominant cost of this function on large catalogs.
          -- The name is already in hand, so test it directly. The quote_ident(in_schema) = in_schema
          -- comparison preserves the original's behavior of never matching (count 0) when the
          -- schema name itself needs quoting, since it compared t.table_schema = quote_ident(in_schema).
          -- SELECT COUNT(*) INTO v_cnt1 FROM information_schema.columns t WHERE EXISTS (SELECT REGEXP_MATCHES(s.column_name, '([A-Z]+)','g') FROM information_schema.columns s
          -- WHERE t.table_schema=s.table_schema and t.table_name=s.table_name and t.column_name=s.column_name AND t.table_schema = quote_ident(in_schema) AND column_name = v_colrec.column_name);
          v_cnt1 := CASE WHEN quote_ident(in_schema) = in_schema AND v_colrec.column_name ~ '[A-Z]' THEN 1 ELSE 0 END;

          --Issue#19 put double-quotes around SQL keyword column names
          SELECT COUNT(*) INTO v_cnt2 FROM pg_get_keywords() WHERE word = v_colrec.column_name AND catcode = 'R';

          IF v_cnt1 > 0 OR v_cnt2 > 0 THEN
            v_table_ddl := v_table_ddl || '  "' || v_colrec.column_name || '" ';
          ELSE
            v_table_ddl := v_table_ddl || '  ' || v_colrec.column_name || ' ';
          END IF;

          -- Issue#23: Handle autogenerated columns and rewrite as a simpler IF THEN ELSE branch instead of a much more complex embedded CASE STATEMENT
          IF v_colrec.is_generated = 'ALWAYS' and v_colrec.generation_expression IS NOT NULL THEN
              -- searchable tsvector GENERATED ALWAYS AS (to_tsvector('simple'::regconfig, COALESCE(translate(email, '@.-'::citext, ' '::text), ''::text)) ) STORED
              v_temp = v_colrec.data_type || ' GENERATED ALWAYS AS (' || v_colrec.generation_expression || ') STORED ';
          ELSEIF v_colrec.udt_name in ('geometry', 'box2d', 'box2df', 'box3d', 'geography', 'geometry_dump', 'gidx', 'spheroid', 'valid_detail') THEN
              v_temp = v_colrec.udt_name;
          ELSEIF v_colrec.data_type = 'USER-DEFINED' THEN
              v_temp = v_colrec.udt_schema || '.' || v_colrec.udt_name;
          ELSEIF v_colrec.data_type = 'ARRAY' THEN
                -- Issue#6 fix: handle arrays
              v_temp = pg_temp.pg_get_coldef(in_schema, in_table,v_colrec.column_name);
              -- v17 fix: handle case-sensitive for pg_get_serial_sequence that requires SQL Identifier handling
              -- WHEN pg_get_serial_sequence(v_qualified, v_colrec.column_name) IS NOT NULL
          ELSEIF pg_get_serial_sequence(quote_ident(in_schema) || '.' || quote_ident(in_table), v_colrec.column_name) IS NOT NULL THEN
              -- Issue#8 fix: handle serial. Note: NOT NULL is implied so no need to declare it explicitly
              v_temp = pg_temp.pg_get_coldef(in_schema, in_table,v_colrec.column_name);
          ELSE
              v_temp = v_colrec.data_type;
          END IF;
          -- RAISE NOTICE 'column def1=%', v_temp;

          -- handle IDENTITY columns
          IF v_colrec.is_identity = 'YES' THEN
              IF v_colrec.identity_generation = 'ALWAYS' THEN
                  v_temp = v_temp || ' GENERATED ALWAYS AS IDENTITY';
              ELSE
                  v_temp = v_temp || ' GENERATED BY DEFAULT AS IDENTITY';
              END IF;
          ELSEIF v_colrec.character_maximum_length IS NOT NULL THEN
              v_temp = v_temp || ('(' || v_colrec.character_maximum_length || ')');
          ELSEIF v_colrec.numeric_precision > 0 AND v_colrec.numeric_scale > 0 THEN
              v_temp = v_temp || '(' || v_colrec.numeric_precision || ',' || v_colrec.numeric_scale || ')';
          END IF;

          -- Handle NULL/NOT NULL
          IF bSerial THEN
              v_temp = v_temp || ' NOT NULL';
          ELSEIF v_colrec.is_nullable = 'NO' THEN
              v_temp = v_temp || ' NOT NULL';
          ELSEIF v_colrec.is_nullable = 'YES' THEN
              v_temp = v_temp || ' NULL';
          END IF;

          -- Handle defaults
          IF v_colrec.column_default IS NOT null AND NOT bSerial THEN
              -- RAISE NOTICE 'Setting default for column, %', v_colrec.column_name;
              v_temp = v_temp || (' DEFAULT ' || v_colrec.column_default);
          END IF;
          v_temp = v_temp || ',' || E'\\n';
          -- RAISE NOTICE 'column def2=%', v_temp;
          v_table_ddl := v_table_ddl || v_temp;
          -- RAISE NOTICE 'tabledef=%', v_table_ddl;

        END LOOP;
      END IF;
      IF bVerbose THEN RAISE NOTICE '(2)tabledef so far: %', v_table_ddl; END IF;

      -- define all the constraints: conparentid does not exist pre PGv11
      IF v_pgversion < 110000 THEN
        FOR v_constraintrec IN
          SELECT con.conname as constraint_name, con.contype as constraint_type,
            CASE
              WHEN con.contype = 'p' THEN 1 -- primary key constraint
              WHEN con.contype = 'u' THEN 2 -- unique constraint
              WHEN con.contype = 'f' THEN 3 -- foreign key constraint
              WHEN con.contype = 'c' THEN 4
              ELSE 5
            END as type_rank,
            pg_get_constraintdef(con.oid) as constraint_definition
          FROM pg_catalog.pg_constraint con JOIN pg_catalog.pg_class rel ON rel.oid = con.conrelid JOIN pg_catalog.pg_namespace nsp ON nsp.oid = connamespace
          WHERE nsp.nspname = in_schema AND rel.relname = in_table ORDER BY type_rank
        LOOP
          v_constraint_name := v_constraintrec.constraint_name;
          v_constraint_def  := v_constraintrec.constraint_definition;
          IF v_constraintrec.type_rank = 1 THEN
              IF pkcnt = 0 OR pktype = 'PKEY_INTERNAL' THEN
                  -- internal def
                  v_constraint_name := v_constraintrec.constraint_name;
                  v_constraint_def  := v_constraintrec.constraint_definition;
                  v_table_ddl := v_table_ddl || '  ' -- note: two char spacer to start, to indent the column
                    || 'CONSTRAINT' || ' '
                    || v_constraint_name || ' '
                    || v_constraint_def
                    || ',' || E'\\n';
              ELSE
                -- Issue#16 handle external PG def
                SELECT 'ALTER TABLE ONLY ' || in_schema || '.' || c.relname || ' ADD CONSTRAINT ' || r.conname || ' ' || pg_catalog.pg_get_constraintdef(r.oid, true) || ';' INTO v_pkey_def
                FROM pg_catalog.pg_constraint r, pg_class c, pg_namespace n where r.conrelid = c.oid and  r.contype = 'p' and n.oid = r.connamespace and n.nspname = in_schema AND c.relname = in_table and r.conname = v_constraint_name;
              END IF;
              IF bPartition THEN
                continue;
              END IF;
          ELSIF v_constraintrec.type_rank = 3 THEN
              -- handle foreign key constraints
              --Issue#22 fix: added FKEY_NONE check
              IF fktype = 'FKEYS_NONE' THEN
                  -- skip
                  continue;
              ELSIF fkcnt = 0 OR fktype = 'FKEYS_INTERNAL' THEN
                  -- internal def
                  v_table_ddl := v_table_ddl || '  ' -- note: two char spacer to start, to indent the column
                    || 'CONSTRAINT' || ' '
                    || v_constraint_name || ' '
                    || v_constraint_def
                    || ',' || E'\\n';
              ELSE
                  -- external def
                  SELECT 'ALTER TABLE ONLY ' || n.nspname || '.' || c2.relname || ' ADD CONSTRAINT ' || r.conname || ' ' || pg_catalog.pg_get_constraintdef(r.oid, true) || ';' INTO v_fkey_def
                  FROM pg_constraint r, pg_class c1, pg_namespace n, pg_class c2 where r.conrelid = c1.oid and  r.contype = 'f' and n.nspname = in_schema and n.oid = r.connamespace and r.conrelid = c2.oid and c2.relname = in_table;
                  v_fkey_defs = v_fkey_defs || v_fkey_def || E'\\n';
              END IF;
          ELSE
              -- handle all other constraints besides PKEY and FKEYS as internal defs by default
              v_table_ddl := v_table_ddl || '  ' -- note: two char spacer to start, to indent the column
                || 'CONSTRAINT' || ' '
                || v_constraint_name || ' '
                || v_constraint_def
                || ',' || E'\\n';
          END IF;
          if bVerbose THEN RAISE NOTICE 'DEBUG4: constraint name=% constraint_def=%', v_constraint_name,v_constraint_def; END IF;
          constraintarr := constraintarr || v_constraintrec.constraint_name:: text;

        END LOOP;
      ELSE
        -- handle PG versions 11 and up
        -- Issue#20: Fix logic for external PKEY and FKEYS
        FOR v_constraintrec IN
          SELECT con.conname as constraint_name, con.contype as constraint_type,
            CASE
              WHEN con.contype = 'p' THEN 1 -- primary key constraint
              WHEN con.contype = 'u' THEN 2 -- unique constraint
              WHEN con.contype = 'f' THEN 3 -- foreign key constraint
              WHEN con.contype = 'c' THEN 4
              ELSE 5
            END as type_rank,
            pg_get_constraintdef(con.oid) as constraint_definition
          FROM pg_catalog.pg_constraint con JOIN pg_catalog.pg_class rel ON rel.oid = con.conrelid JOIN pg_catalog.pg_namespace nsp ON nsp.oid = connamespace
          WHERE nsp.nspname = in_schema AND rel.relname = in_table
                --Issue#13 added this condition:
                AND con.conparentid = 0
                ORDER BY type_rank
        LOOP
          v_constraint_name := v_constraintrec.constraint_name;
          v_constraint_def  := v_constraintrec.constraint_definition;
          IF v_constraintrec.type_rank = 1 THEN
              IF pkcnt = 0 OR pktype = 'PKEY_INTERNAL' THEN
                  -- internal def
                  v_constraint_name := v_constraintrec.constraint_name;
                  v_constraint_def  := v_constraintrec.constraint_definition;
                  v_table_ddl := v_table_ddl || '  ' -- note: two char spacer to start, to indent the column
                    || 'CONSTRAINT' || ' '
                    || v_constraint_name || ' '
                    || v_constraint_def
                    || ',' || E'\\n';
              ELSE
                -- Issue#16 handle external PG def
                SELECT 'ALTER TABLE ONLY ' || in_schema || '.' || c.relname || ' ADD CONSTRAINT ' || r.conname || ' ' || pg_catalog.pg_get_constraintdef(r.oid, true) || ';' INTO v_pkey_def
                FROM pg_catalog.pg_constraint r, pg_class c, pg_namespace n where r.conrelid = c.oid and  r.contype = 'p' and n.oid = r.connamespace and n.nspname = in_schema AND c.relname = in_table;
              END IF;
              IF bPartition THEN
                continue;
              END IF;
          ELSIF v_constraintrec.type_rank = 3 THEN
              -- handle foreign key constraints
              --Issue#22 fix: added FKEY_NONE check
              IF fktype = 'FKEYS_NONE' THEN
                  -- skip
                  continue;
              ELSIF fkcnt = 0 OR fktype = 'FKEYS_INTERNAL' THEN
                  -- internal def
                  v_table_ddl := v_table_ddl || '  ' -- note: two char spacer to start, to indent the column
                    || 'CONSTRAINT' || ' '
                    || v_constraint_name || ' '
                    || v_constraint_def
                    || ',' || E'\\n';
              ELSE
                  -- external def
                  SELECT 'ALTER TABLE ONLY ' || n.nspname || '.' || c2.relname || ' ADD CONSTRAINT ' || r.conname || ' ' || pg_catalog.pg_get_constraintdef(r.oid, true) || ';' INTO v_fkey_def
                  FROM pg_constraint r, pg_class c1, pg_namespace n, pg_class c2 where r.conrelid = c1.oid and  r.contype = 'f' and n.nspname = in_schema and n.oid = r.connamespace and r.conrelid = c2.oid and c2.relname = in_table and
                  r.conname = v_constraint_name and r.conparentid = 0;
                  v_fkey_defs = v_fkey_defs || v_fkey_def || E'\\n';
              END IF;
          ELSE
              -- handle all other constraints besides PKEY and FKEYS as internal defs by default
              v_table_ddl := v_table_ddl || '  ' -- note: two char spacer to start, to indent the column
                || 'CONSTRAINT' || ' '
                || v_constraint_name || ' '
                || v_constraint_def
                || ',' || E'\\n';
          END IF;
          if bVerbose THEN RAISE NOTICE 'DEBUG4: constraint name=% constraint_def=%', v_constraint_name,v_constraint_def; END IF;
          constraintarr := constraintarr || v_constraintrec.constraint_name:: text;

        END LOOP;
      END IF;

      -- drop the last comma before ending the create statement, which should be right before the carriage return character
      -- Issue#24: make sure the comma is there before removing it
      select substring(v_table_ddl, length(v_table_ddl) - 1, 1) INTO v_temp;
      IF v_temp = ',' THEN
          v_table_ddl = substr(v_table_ddl, 0, length(v_table_ddl) - 1) || E'\\n';
      END IF;
      IF bVerbose THEN RAISE NOTICE '(3)tabledef so far: %', trim(v_table_ddl); END IF;

      -- ---------------------------------------------------------------------------
      -- at this point we have everything up to the last table-enclosing parenthesis
      -- ---------------------------------------------------------------------------
      IF bVerbose THEN RAISE NOTICE '(4)tabledef so far: %', v_table_ddl; END IF;

      -- See if this is an inheritance-based child table and finish up the table create.
      IF bPartition and bInheritance THEN
        -- Issue#11: handle parent schema
        -- v_table_ddl := v_table_ddl || ') INHERITS (' || in_schema || '.' || v_parent || ') ' || E'\\n' || v_relopts || ' ' || v_tablespace || ';' || E'\\n';
        IF v_parent_schema = '' OR v_parent_schema IS NULL THEN v_parent_schema = in_schema; END IF;
        v_table_ddl := v_table_ddl || ') INHERITS (' || v_parent_schema || '.' || v_parent || ') ' || E'\\n' || v_relopts || ' ' || v_tablespace || ';' || E'\\n';
      END IF;

      IF v_pgversion >= 100000 AND NOT bPartition and NOT bInheritance THEN
        -- See if this is a partitioned table (pg_class.relkind = 'p') and add the partitioned key
        SELECT pg_get_partkeydef(c1.oid) as partition_key INTO v_partition_key FROM pg_class c1 JOIN pg_namespace n ON (n.oid = c1.relnamespace) LEFT JOIN pg_partitioned_table p ON (c1.oid = p.partrelid)
        WHERE n.nspname = in_schema and n.oid = c1.relnamespace and c1.relname = in_table and c1.relkind = 'p';

        IF v_partition_key IS NOT NULL AND v_partition_key <> '' THEN
          -- add partition clause
          -- NOTE:  cannot specify default tablespace for partitioned relations
          -- v_table_ddl := v_table_ddl || ') PARTITION BY ' || v_partition_key || ' ' || v_tablespace || ';' || E'\\n';
          v_table_ddl := v_table_ddl || ') PARTITION BY ' || v_partition_key || ';' || E'\\n';
        ELSEIF v_relopts <> '' THEN
          v_table_ddl := v_table_ddl || ') ' || v_relopts || ' ' || v_tablespace || ';' || E'\\n';
        ELSE
          -- end the create definition
          v_table_ddl := v_table_ddl || ') ' || v_tablespace || ';' || E'\\n';
        END IF;
      END IF;

      IF bVerbose THEN RAISE NOTICE '(5)tabledef so far: %', v_table_ddl; END IF;

      -- Add closing paren for regular tables
      -- IF NOT bPartition THEN
      -- v_table_ddl := v_table_ddl || ') ' || v_relopts || ' ' || v_tablespace || E';\\n';
      -- END IF;
      -- RAISE NOTICE 'ddlsofar3: %', v_table_ddl;

      -- Issue#16 create the external PKEY def if indicated
      IF v_pkey_def <> '' THEN
          v_table_ddl := v_table_ddl || v_pkey_def || E'\\n';
      END IF;

      -- Issue#20
      IF v_fkey_defs <> '' THEN
            v_table_ddl := v_table_ddl || v_fkey_defs || E'\\n';
      END IF;

      IF bVerbose THEN RAISE NOTICE '(6)tabledef so far: %', v_table_ddl; END IF;

      -- create indexes
      FOR v_indexrec IN
        SELECT indexdef, COALESCE(tablespace, 'pg_default') as tablespace, indexname FROM pg_indexes WHERE (schemaname, tablename) = (in_schema, in_table)
      LOOP
        -- RAISE NOTICE 'DEBUG6: indexname=%  indexdef=%', v_indexrec.indexname, v_indexrec.indexdef;
        -- loop through constraints and skip ones already defined
        bSkip = False;
        FOREACH constraintelement IN ARRAY constraintarr
        LOOP
          IF constraintelement = v_indexrec.indexname THEN
              -- RAISE NOTICE 'DEBUG7: skipping index, %', v_indexrec.indexname;
              bSkip = True;
              EXIT;
          END IF;
        END LOOP;
        if bSkip THEN CONTINUE; END IF;

        -- Add IF NOT EXISTS clause so partition index additions will not be created if declarative partition in effect and index already created on parent
        v_indexrec.indexdef := REPLACE(v_indexrec.indexdef, 'CREATE INDEX', 'CREATE INDEX IF NOT EXISTS');
        -- Fix Issue#26: do it for unique/primary key indexes as well
        v_indexrec.indexdef := REPLACE(v_indexrec.indexdef, 'CREATE UNIQUE INDEX', 'CREATE UNIQUE INDEX IF NOT EXISTS');
        -- RAISE NOTICE 'DEBUG8: adding index, %', v_indexrec.indexname;

        -- NOTE:  cannot specify default tablespace for partitioned relations
        IF v_partition_key IS NOT NULL AND v_partition_key <> '' THEN
            v_table_ddl := v_table_ddl || v_indexrec.indexdef || ';' || E'\\n';
        ELSE
            -- Issue#25: see if partial index or not
            -- Supabase perf fix: scope by the table OID resolved earlier instead of casting
            -- relnamespace::regnamespace::text for every pg_class row (O(catalog) per index).
            -- Indexes always live in the same schema as their table, so the schema quals were
            -- redundant with v_table_oid.
            -- select CASE WHEN i.indpred IS NOT NULL THEN True ELSE False END INTO v_partial
            -- FROM pg_index i JOIN pg_class c1 ON (i.indexrelid = c1.oid) JOIN pg_class c2 ON (i.indrelid = c2.oid)
            -- WHERE c1.relnamespace::regnamespace::text = in_schema AND c2.relnamespace::regnamespace::text = in_schema AND c2.relname = in_table AND c1.relname = v_indexrec.indexname;
            select CASE WHEN i.indpred IS NOT NULL THEN True ELSE False END INTO v_partial
            FROM pg_index i JOIN pg_class c1 ON (i.indexrelid = c1.oid)
            WHERE i.indrelid = v_table_oid AND c1.relname = v_indexrec.indexname;
            IF v_partial THEN
                -- Put tablespace def before WHERE CLAUSE
                v_temp = v_indexrec.indexdef;
                v_pos = POSITION(' WHERE ' IN v_temp);
                v_temp2 = SUBSTRING(v_temp, v_pos);
                v_temp  = SUBSTRING(v_temp, 1, v_pos);
                v_table_ddl := v_table_ddl || v_temp || ' TABLESPACE ' || v_indexrec.tablespace || v_temp2 || ';' || E'\\n';
            ELSE
                v_table_ddl := v_table_ddl || v_indexrec.indexdef || ' TABLESPACE ' || v_indexrec.tablespace || ';' || E'\\n';
            END IF;
        END IF;

      END LOOP;
      IF bVerbose THEN RAISE NOTICE '(7)tabledef so far: %', v_table_ddl; END IF;

      -- Issue#20: added logic for table and column comments
      IF  cmtcnt > 0 THEN
          FOR v_rec IN
            SELECT c.relname, 'COMMENT ON ' || CASE WHEN c.relkind in ('r','p') AND a.attname IS NULL THEN 'TABLE ' WHEN c.relkind in ('r','p') AND a.attname IS NOT NULL THEN 'COLUMN ' WHEN c.relkind = 'f' THEN 'FOREIGN TABLE '
                  WHEN c.relkind = 'm' THEN 'MATERIALIZED VIEW ' WHEN c.relkind = 'v' THEN 'VIEW ' WHEN c.relkind = 'i' THEN 'INDEX ' WHEN c.relkind = 'S' THEN 'SEQUENCE ' ELSE 'XX' END || n.nspname || '.' ||
                  CASE WHEN c.relkind in ('r','p') AND a.attname IS NOT NULL THEN quote_ident(c.relname) || '.' || a.attname ELSE quote_ident(c.relname) END || ' IS '   || quote_literal(d.description) || ';' as ddl
            FROM pg_class c JOIN pg_namespace n ON (n.oid = c.relnamespace) LEFT JOIN pg_description d ON (c.oid = d.objoid) LEFT JOIN pg_attribute a ON (c.oid = a.attrelid AND a.attnum > 0 and a.attnum = d.objsubid)
            WHERE d.description IS NOT NULL AND n.nspname = in_schema AND c.relname = in_table ORDER BY 2 desc, ddl
          LOOP
              --RAISE NOTICE 'comments:%', v_rec.ddl;
              v_table_ddl = v_table_ddl || v_rec.ddl || E'\\n';
          END LOOP;
      END IF;
      IF bVerbose THEN RAISE NOTICE '(8)tabledef so far: %', v_table_ddl; END IF;

      IF trigtype = 'INCLUDE_TRIGGERS' THEN
        -- Issue#14: handle multiple triggers for a table
        FOR v_trigrec IN
            select pg_get_triggerdef(t.oid, True) || ';' as triggerdef FROM pg_trigger t, pg_class c, pg_namespace n
            WHERE n.nspname = in_schema and n.oid = c.relnamespace and c.relname = in_table and c.relkind = 'r' and t.tgrelid = c.oid and NOT t.tgisinternal
        LOOP
            v_table_ddl := v_table_ddl || v_trigrec.triggerdef;
            v_table_ddl := v_table_ddl || E'\\n';
            IF bVerbose THEN RAISE NOTICE 'triggerdef = %', v_trigrec.triggerdef; END IF;
        END LOOP;
      END IF;

      IF bVerbose THEN RAISE NOTICE '(9)tabledef so far: %', v_table_ddl; END IF;
      -- add empty line
      v_table_ddl := v_table_ddl || E'\\n';
      IF bVerbose THEN RAISE NOTICE '(10)tabledef so far: %', v_table_ddl; END IF;

      -- reset search_path back to what it was
      IF search_path_old = '' THEN
        SELECT set_config('search_path', '', false) into v_temp;
      ELSE
        EXECUTE 'SET search_path = ' || search_path_old;
      END IF;

      RETURN v_table_ddl;

      EXCEPTION
      WHEN others THEN
      BEGIN
        GET STACKED DIAGNOSTICS v_diag1 = MESSAGE_TEXT, v_diag2 = PG_EXCEPTION_DETAIL, v_diag3 = PG_EXCEPTION_HINT, v_diag4 = RETURNED_SQLSTATE, v_diag5 = PG_CONTEXT, v_diag6 = PG_EXCEPTION_CONTEXT;
        -- v_ret := 'line=' || v_diag6 || '. '|| v_diag4 || '. ' || v_diag1 || ' .' || v_diag2 || ' .' || v_diag3;
        v_ret := 'line=' || v_diag6 || '. '|| v_diag4 || '. ' || v_diag1;
        RAISE EXCEPTION '%', v_ret;
        -- put additional coding here if necessarY
        RETURN '';
      END;

    END;
  $$;`;e.s(["getTableDefinitionSql",0,({id:e,scoped:t=!1})=>p`
    ${(({scoped:e=!1}={})=>e?tE:tm)({scoped:t})}

    with table_info as (
      select 
        n.nspname::text as schema,
        c.relname::text as name
      from pg_class c
      join pg_namespace n on n.oid = c.relnamespace
      where c.oid = ${l(e)}
    )
    select pg_temp.pg_get_tabledef (
      t.schema,
      t.name,
      false,
      'FKEYS_INTERNAL',
      'INCLUDE_TRIGGERS'
    ) as definition
    from table_info t;
  `],538892);e.s(["getTablesPaginatedSql",0,({schema:e,includeColumns:t=!1,limit:a,afterOid:i,nameFilter:r})=>{let s=g(e?[e]:void 0,void 0,e?void 0:n.DEFAULT_SYSTEM_SCHEMAS),o=s?p`and nc.nspname ${s}`:p``,c=r&&r.length>0?e?p`and c.relname ilike ${l(`%${r.replace(/([\\%_])/g,"\\$1")}%`)}`:p`and (
            c.relname ilike ${l(`%${r.replace(/([\\%_])/g,"\\$1")}%`)}
            or nc.nspname ilike ${l(`%${r.replace(/([\\%_])/g,"\\$1")}%`)}
            or (nc.nspname || '.' || c.relname) ilike ${l(`%${r.replace(/([\\%_])/g,"\\$1")}%`)}
          )`:p``,_=t?p`, columns as (${v({filter:{column:"oid",predicate:p`in (select oid from page)`}})})`:p``,d=t?p`, ${u("columns",p`columns.table_id = tables.id`)}`:p``;return p`
    with page as (
      select
        c.oid,
        c.relname,
        c.relrowsecurity,
        c.relforcerowsecurity,
        c.relreplident,
        nc.nspname as schema,
        -- Computed once here so the final select can reference it for both the
        -- raw byte count and pg_size_pretty without re-walking heap+toast+indexes.
        pg_total_relation_size(c.oid) as bytes_raw
      from pg_namespace nc
      join pg_class c on nc.oid = c.relnamespace
      where c.relkind in ('r', 'p')
        and not pg_is_other_temp_schema(nc.oid)
        and c.oid > ${l(i)}
        and (
          pg_has_role(c.relowner, 'USAGE')
          or has_table_privilege(
            c.oid,
            'SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER'
          )
          or has_any_column_privilege(c.oid, 'SELECT, INSERT, UPDATE, REFERENCES')
        )
        ${o}
        ${c}
      order by c.oid
      limit ${l(a)}
    ),
    page_primary_keys as (
      select
        c.oid::int8 as table_id,
        jsonb_agg(
          jsonb_build_object(
            'table_id', c.oid::int8,
            'schema', n.nspname,
            'table_name', c.relname,
            'name', a.attname
          )
          order by array_position(i.indkey, a.attnum)
        ) as primary_keys
      from pg_index i
      join pg_class c on i.indrelid = c.oid
      join pg_namespace n on c.relnamespace = n.oid
      join pg_attribute a on a.attrelid = c.oid and a.attnum = any(i.indkey)
      where i.indisprimary
        and c.oid in (select oid from page)
      group by c.oid
    ),
    -- Two-armed UNION ALL keyed by table_id so the downstream join is a plain
    -- equi-join (see tables CTE below). The previous shape used an OR across
    -- (source_oid, target_oid), which planners can't decompose into two index
    -- probes. The target-side arm skips self-referential FKs so they aren't
    -- emitted twice.
    page_relationships as (
      select
        csa.oid::int8 as table_id,
        c.oid::int8 as id,
        c.conname as constraint_name,
        nsa.nspname as source_schema,
        csa.relname as source_table_name,
        sa.attname as source_column_name,
        nta.nspname as target_table_schema,
        cta.relname as target_table_name,
        ta.attname as target_column_name
      from pg_constraint c
      join pg_class csa on csa.oid = c.conrelid
      join pg_namespace nsa on nsa.oid = csa.relnamespace
      -- Pair conkey/confkey by ordinal so composite FKs don't fan out into a
      -- cross-product of (source_col, target_col) rows.
      join lateral unnest(c.conkey, c.confkey) as fk(src_attnum, tgt_attnum) on true
      join pg_attribute sa on sa.attrelid = c.conrelid and sa.attnum = fk.src_attnum
      join pg_class cta on cta.oid = c.confrelid
      join pg_namespace nta on nta.oid = cta.relnamespace
      join pg_attribute ta on ta.attrelid = c.confrelid and ta.attnum = fk.tgt_attnum
      where c.contype = 'f'
        and csa.oid in (select oid from page)
      union all
      select
        cta.oid::int8 as table_id,
        c.oid::int8 as id,
        c.conname as constraint_name,
        nsa.nspname as source_schema,
        csa.relname as source_table_name,
        sa.attname as source_column_name,
        nta.nspname as target_table_schema,
        cta.relname as target_table_name,
        ta.attname as target_column_name
      from pg_constraint c
      join pg_class csa on csa.oid = c.conrelid
      join pg_namespace nsa on nsa.oid = csa.relnamespace
      join lateral unnest(c.conkey, c.confkey) as fk(src_attnum, tgt_attnum) on true
      join pg_attribute sa on sa.attrelid = c.conrelid and sa.attnum = fk.src_attnum
      join pg_class cta on cta.oid = c.confrelid
      join pg_namespace nta on nta.oid = cta.relnamespace
      join pg_attribute ta on ta.attrelid = c.confrelid and ta.attnum = fk.tgt_attnum
      where c.contype = 'f'
        and cta.oid in (select oid from page)
        and cta.oid <> csa.oid
    ),
    tables as (
      select
        p.oid::int8 as id,
        p.schema as schema,
        p.relname as name,
        p.relrowsecurity as rls_enabled,
        p.relforcerowsecurity as rls_forced,
        case
          when p.relreplident = 'd' then 'DEFAULT'
          when p.relreplident = 'i' then 'INDEX'
          when p.relreplident = 'f' then 'FULL'
          else 'NOTHING'
        end as replica_identity,
        p.bytes_raw::int8 as bytes,
        pg_size_pretty(p.bytes_raw) as size,
        pg_stat_get_live_tuples(p.oid) as live_rows_estimate,
        pg_stat_get_dead_tuples(p.oid) as dead_rows_estimate,
        obj_description(p.oid) as comment,
        coalesce(pk.primary_keys, '[]'::jsonb) as primary_keys,
        coalesce(
          jsonb_agg(
            jsonb_build_object(
              'id', r.id,
              'constraint_name', r.constraint_name,
              'source_schema', r.source_schema,
              'source_table_name', r.source_table_name,
              'source_column_name', r.source_column_name,
              'target_table_schema', r.target_table_schema,
              'target_table_name', r.target_table_name,
              'target_column_name', r.target_column_name
            )
          ) filter (where r.id is not null),
          '[]'::jsonb
        ) as relationships
      from page p
      left join page_primary_keys pk on pk.table_id = p.oid
      left join page_relationships r on r.table_id = p.oid
      group by
        p.oid,
        p.schema,
        p.relname,
        p.relrowsecurity,
        p.relforcerowsecurity,
        p.relreplident,
        p.bytes_raw,
        pk.primary_keys
    )${_}
    select tables.*${d}
    from tables
    order by tables.id
  `}],190804);var tu=((t={}).NO_ACTION="a",t.RESTRICT="r",t.CASCADE="c",t.SET_NULL="n",t.SET_DEFAULT="d",t);e.s(["FOREIGN_KEY_CASCADE_ACTION",()=>tu,"getAddForeignKeySQL",0,({table:e,foreignKeys:t})=>{let a=t.map(t=>{let{deletionAction:a,updateAction:n}=t,i="c"===a?p`ON DELETE CASCADE`:"r"===a?p`ON DELETE RESTRICT`:"d"===a?p`ON DELETE SET DEFAULT`:"n"===a?p`ON DELETE SET NULL`:p``,r="c"===n?p`ON UPDATE CASCADE`:"r"===n?p`ON UPDATE RESTRICT`:p``,s=E(t.columns.map(e=>o(e.source)),", "),l=E(t.columns.map(e=>o(e.target)),", ");return p`ALTER TABLE ${o(e.schema)}.${o(e.name)} ADD FOREIGN KEY (${s}) REFERENCES ${o(t.schema)}.${o(t.table)} (${l}) ${r} ${i}`});return p`${E(a,";\n")};`},"getForeignKeyConstraintsSql",0,({schema:e})=>{if(!e)throw Error("schema is required");return p`
SELECT
  con.oid as id,
  con.conname as constraint_name,
  con.confdeltype as deletion_action,
  con.confupdtype as update_action,
  rel.oid as source_id,
  nsp.nspname as source_schema,
  rel.relname as source_table,
  (
    SELECT
      array_agg(
        att.attname
        ORDER BY
          un.ord
      )
    FROM
      unnest(con.conkey) WITH ORDINALITY un (attnum, ord)
      INNER JOIN pg_attribute att ON att.attnum = un.attnum
    WHERE
      att.attrelid = rel.oid
  ) source_columns,
  frel.oid as target_id,
  fnsp.nspname as target_schema,
  frel.relname as target_table,
  (
    SELECT
      array_agg(
        att.attname
        ORDER BY
          un.ord
      )
    FROM
      unnest(con.confkey) WITH ORDINALITY un (attnum, ord)
      INNER JOIN pg_attribute att ON att.attnum = un.attnum
    WHERE
      att.attrelid = frel.oid
  ) target_columns
FROM
  pg_constraint con
  INNER JOIN pg_class rel ON rel.oid = con.conrelid
  INNER JOIN pg_namespace nsp ON nsp.oid = rel.relnamespace
  INNER JOIN pg_class frel ON frel.oid = con.confrelid
  INNER JOIN pg_namespace fnsp ON fnsp.oid = frel.relnamespace
WHERE
  con.contype = 'f'
  AND nsp.nspname = ${l(e)}
`},"getRemoveForeignKeySQL",0,({table:e,foreignKeys:t})=>{let a=t.map(t=>p`ALTER TABLE IF EXISTS ${o(e.schema)}.${o(e.name)} DROP CONSTRAINT IF EXISTS ${o(t.name)}`);return p`${E(a,";\n")};`}],788035);let tg=p`ROLE_IMPERSONATION_NO_RESULTS`;e.s(["ROLE_IMPERSONATION_NO_RESULTS",0,tg,"ROLE_IMPERSONATION_SQL_LINE_COUNT",0,11,"getImpersonationSQL",0,({role:e,unexpiredClaims:t,sql:a})=>{var n;let i="postgrest"===e.type?void 0!==t?function({role:e,unexpiredClaims:t}){return p`
select set_config('role', ${l(e)}, true),
set_config('request.jwt.claims', ${l(JSON.stringify(t))}, true),
set_config('request.method', 'POST', true),
set_config('request.path', '/impersonation-example-request-path', true),
set_config('request.headers', '{"accept": "*/*"}', true);
  `}({role:e.role,unexpiredClaims:t}):p``:(n=e.role,p`
    set local role ${l(n)};
  `);return p`
    ${i}

    -- If the users sql returns no rows, pg-meta will
    -- fallback to returning the result of the impersonation sql.
    select 1 as "${tg}";

    ${a}
  `}],389273),e.s(["default",0,{roles:{list:function({includeDefaultRoles:e=!1,limit:t,offset:a}={}){let n=p`
with
  roles as (${eg})
select
  *
from
  roles
where
  true
`;return e||(n=p`${n} and not pg_catalog.starts_with(name, 'pg_')`),t&&(n=p`${n} limit ${l(t)}`),a&&(n=p`${n} offset ${l(a)}`),{sql:n,zod:eb}},retrieve:function(e){return{sql:p`with roles as (${eg}) select * from roles where ${eh(e)};`,zod:ef}},create:function({name:e,isSuperuser:t=!1,canCreateDb:a=!1,canCreateRole:n=!1,inheritRole:i=!0,canLogin:r=!1,isReplicationRole:s=!1,canBypassRls:c=!1,connectionLimit:_=-1,password:d,validUntil:m,memberOf:u=[],members:g=[],admins:N=[],config:b={}}){return{sql:p`
create role ${o(e)}
  ${t?p`superuser`:p``}
  ${a?p`createdb`:p``}
  ${n?p`createrole`:p``}
  ${i?p``:p`noinherit`}
  ${r?p`login`:p``}
  ${s?p`replication`:p``}
  ${c?p`bypassrls`:p``}
  connection limit ${l(_)}
  ${void 0===d?p``:p`password ${l(d)}`}
  ${void 0===m?p``:p`valid until ${l(m)}`}
  ${0===u.length?p``:p`in role ${E(u.map(o),",")}`}
  ${0===g.length?p``:p`role ${E(g.map(o),",")}`}
  ${0===N.length?p``:p`admin ${E(N.map(o),",")}`}
  ;
${E(Object.entries(b).map(([t,a])=>p`alter role ${o(e)} set ${o(t)} = ${l(a)};`),"\n")}
`}},update:function(e,t){let{name:a,isSuperuser:n,canCreateDb:i,canCreateRole:r,inheritRole:s,canLogin:o,isReplicationRole:c,canBypassRls:_,connectionLimit:d,password:m,validUntil:E}=t;return{sql:p`
do $$
declare
  old record;
begin
  with roles as (${eg})
  select * into old from roles where ${eh(e)};
  if old is null then
    raise exception 'Cannot find role with id %', id;
  end if;

  execute(format('alter role %I
    ${void 0===n?p``:n?p`superuser`:p`nosuperuser`}
    ${void 0===i?p``:i?p`createdb`:p`nocreatedb`}
    ${void 0===r?p``:r?p`createrole`:p`nocreaterole`}
    ${void 0===s?p``:s?p`inherit`:p`noinherit`}
    ${void 0===o?p``:o?p`login`:p`nologin`}
    ${void 0===c?p``:c?p`replication`:p`noreplication`}
    ${void 0===_?p``:_?p`bypassrls`:p`nobypassrls`}
    ${void 0===d?p``:p`connection limit ${l(d)}`}
    ${void 0===m?p``:p`password ${l(m)}`}
    ${void 0===E?p``:p`valid until %L`}
  ', old.name${void 0===E?p``:p`, ${l(E)}`}));

  ${void 0===a?p``:p`
  -- Using the same name in the rename clause gives an error, so only do it if the new name is different.
  if ${l(a)} != old.name then
    execute(format('alter role %I rename to %I;', old.name, ${l(a)}));
  end if;
  `}
end
$$;
`}},remove:function(e,{ifExists:t=!1}={}){return{sql:p`
do $$
declare
  old record;
begin
  with roles as (${eg})
  select * into old from roles where ${eh(e)};
  if old is null then
    raise exception 'Cannot find role with id %', id;
  end if;

  execute(format('drop role ${t?p`if exists`:p``} %I;', old.name));
end
$$;
`}},zod:eN},columns:{list:function({tableId:e,includeSystemSchemas:t=!1,includedSchemas:a,excludedSchemas:i,limit:r,offset:s}={}){let o=p`
with
  columns as (${I})
select
  *
from
  columns
where
 true
`,c=g(a,i,t?void 0:n.DEFAULT_SYSTEM_SCHEMAS);return c&&(o=p`${o} and schema ${c}`),void 0!==e&&(o=p`${o} and table_id = ${l(e)} `),r&&(o=p`${o} limit ${l(r)}`),s&&(o=p`${o} offset ${l(s)}`),{sql:o,zod:A}},retrieve:function(e){return{sql:p`WITH columns AS (${I}) SELECT * FROM columns WHERE ${function(e){if("id"in e&&e.id)return p`${o("id")} = ${l(e.id)}`;if("name"in e&&e.name&&e.schema&&e.table)return p`schema = ${l(e.schema)} AND ${o("table")} = ${l(e.table)} AND name = ${l(e.name)}`;throw Error("Must provide either id or schema, name and table")}(e)};`,zod:R}},create:function({schema:e,table:t,name:a,type:n,is_identity:i=!1,identity_generation:r="BY DEFAULT",is_nullable:s,is_primary_key:c=!1,is_unique:d=!1,comment:E,check:u,no_transaction:g=!1,...N}){let b=p``;if(i){if(void 0!==N.default_value)throw Error("Columns cannot both be identity and have a default value");b=p`GENERATED ${_(r)} AS IDENTITY`}else void 0===N.default_value||(b="expression"===N.default_value_format?p`DEFAULT ${N.default_value}`:p`DEFAULT ${l(N.default_value)}`);let f=void 0===s?p``:s?p`NULL`:p`NOT NULL`,h=c?p`PRIMARY KEY`:p``,T=d?p`UNIQUE`:p``,v=void 0===u?p``:p`CHECK (${m(u)})`,I=void 0===E?p``:p`COMMENT ON COLUMN ${o(e)}.${o(t)}.${o(a)} IS ${l(E)}`,S=p`
  ALTER TABLE ${o(e)}.${o(t)} ADD COLUMN ${o(a)} ${O(n)}
    ${b}
    ${f}
    ${h}
    ${T}
    ${v};
  ${I};`;return g?{sql:S}:{sql:p`
  BEGIN;
    ${S};
  COMMIT;`}},update:function(e,{name:t,type:a,drop_default:n=!1,default_value:i,default_value_format:r="literal",is_identity:s,identity_generation:c="BY DEFAULT",is_nullable:d,is_unique:m,comment:E,check:u}){let g,N,b,f=void 0===t||t===e.name?p``:p`ALTER TABLE ${o(e.schema)}.${o(e.table)} RENAME COLUMN ${o(e.name)} TO ${o(t)};`,h=void 0===a?p``:p`ALTER TABLE ${o(e.schema)}.${o(e.table)} ALTER COLUMN ${o(e.name)} SET DATA TYPE ${O(a)} USING ${o(e.name)}::${O(a)};`;if(n)g=p`ALTER TABLE ${o(e.schema)}.${o(e.table)} ALTER COLUMN ${o(e.name)} DROP DEFAULT;`;else if(void 0===i)g=p``;else{let t="expression"===r?i:l(i);g=p`ALTER TABLE ${o(e.schema)}.${o(e.table)} ALTER COLUMN ${o(e.name)} SET DEFAULT ${t};`}let T=p`ALTER TABLE ${o(e.schema)}.${o(e.table)} ALTER COLUMN ${o(e.name)}`;N=!1===s?p`${T} DROP IDENTITY IF EXISTS;`:!0===e.is_identity?void 0===c?p``:p`${T} SET GENERATED ${_(c)};`:void 0===s?p``:p`${T} ADD GENERATED ${_(c)} AS IDENTITY;`,b=void 0===d?p``:d?p`ALTER TABLE ${o(e.schema)}.${o(e.table)} ALTER COLUMN ${o(e.name)} DROP NOT NULL;`:p`ALTER TABLE ${o(e.schema)}.${o(e.table)} ALTER COLUMN ${o(e.name)} SET NOT NULL;`;let v=p``;!0===e.is_unique&&!1===m?v=p`
DO $$
DECLARE
  r record;
BEGIN
  FOR r IN
    SELECT conname FROM pg_constraint WHERE
      contype = 'u'
      AND cardinality(conkey) = 1
      AND conrelid = ${l(e.table_id)}
      AND conkey[1] = ${l(e.ordinal_position)}
  LOOP
    EXECUTE ${l(`ALTER TABLE ${o(e.schema)}.${o(e.table)} DROP CONSTRAINT `)} || quote_ident(r.conname);
  END LOOP;
END
$$;`:!1===e.is_unique&&!0===m&&(v=p`ALTER TABLE ${o(e.schema)}.${o(e.table)} ADD UNIQUE (${o(e.name)});`);let I=void 0===E?p``:p`COMMENT ON COLUMN ${o(e.schema)}.${o(e.table)}.${o(e.name)} IS ${l(E)};`,S=p``;if(void 0!==u){let t=null!==u?p`
  ALTER TABLE ${o(e.schema)}.${o(e.table)} ADD CONSTRAINT ${o(`${e.table}_${e.name}_check`)} CHECK (${u});

  SELECT conkey into v_conkey FROM pg_constraint WHERE conname = ${l(`${e.table}_${e.name}_check`)};

  ASSERT v_conkey IS NOT NULL, 'error creating column constraint: check condition must refer to this column';
  ASSERT cardinality(v_conkey) = 1, 'error creating column constraint: check condition cannot refer to multiple columns';
  ASSERT v_conkey[1] = ${l(e.ordinal_position)}, 'error creating column constraint: check condition cannot refer to other columns';`:p``;S=p`
DO $$
DECLARE
  v_conname name;
  v_conkey int2[];
BEGIN
  SELECT conname into v_conname FROM pg_constraint WHERE
    contype = 'c'
    AND cardinality(conkey) = 1
    AND conrelid = ${l(e.table_id)}
    AND conkey[1] = ${l(e.ordinal_position)}
    ORDER BY oid asc
    LIMIT 1;

  IF v_conname IS NOT NULL THEN
    EXECUTE format('ALTER TABLE ${o(e.schema)}.${o(e.table)} DROP CONSTRAINT %I', v_conname);
  END IF;
  ${t}
END
$$;`}return{sql:p`
BEGIN;
  ${b}
  ${h}
  ${g}
  ${N}
  ${v}
  ${I}
  ${S}
  ${f}
COMMIT;`}},remove:function(e,{cascade:t=!1}={}){return{sql:p`ALTER TABLE ${o(e.schema)}.${o(e.table)} DROP COLUMN ${o(e.name)} ${t?p`CASCADE`:p`RESTRICT`};`}},zod:S},schemas:{list:function({includeSystemSchemas:e=!1,limit:t,offset:a}={}){let i=eT;return e||(i=p`${i} and not (n.nspname in (${E(n.DEFAULT_SYSTEM_SCHEMAS.map(l),",")}))`),t&&(i=p`${i} limit ${l(t)}`),a&&(i=p`${i} offset ${l(a)}`),{sql:i,zod:eI}},retrieve:function({id:e,name:t}){return e?{sql:p`${eT} and n.oid = ${l(e)};`,zod:eS}:{sql:p`${eT} and n.nspname = ${l(t)};`,zod:eS}},create:function({name:e,owner:t}){return{sql:p`create schema ${o(e)}
  ${void 0===t?p``:p`authorization ${o(t)}`};
`}},update:function({id:e,name:t},{name:a,owner:n}){return{sql:p`
do $$
declare
  id oid := ${void 0===e?p`${l(t)}::regnamespace`:l(e)};
  old record;
  new_name text := ${void 0===a?l(null):l(a)};
  new_owner text := ${void 0===n?l(null):l(n)};
begin
  select * into old from pg_namespace where oid = id;
  if old is null then
    raise exception 'Cannot find schema with id %', id;
  end if;

  if new_owner is not null then
    execute(format('alter schema %I owner to %I;', old.nspname, new_owner));
  end if;

  -- Using the same name in the rename clause gives an error, so only do it if the new name is different.
  if new_name is not null and new_name != old.nspname then
    execute(format('alter schema %I rename to %I;', old.nspname, new_name));
  end if;
end
$$;
`}},remove:function({id:e,name:t},{cascade:a=!1}={}){return{sql:p`
do $$
declare
  id oid := ${void 0===e?p`${l(t)}::regnamespace`:l(e)};
  old record;
  cascade bool := ${l(a)};
begin
  select * into old from pg_namespace where oid = id;
  if old is null then
    raise exception 'Cannot find schema with id %', id;
  end if;

  execute(format('drop schema %I %s;', old.nspname, case when cascade then 'cascade' else 'restrict' end));
end
$$;
`}},zod:ev},tables:ez,functions:K,tablePrivileges:{list:function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:a,limit:i,offset:r,scoped:s=!1}={}){let o=g(t,a,e?void 0:n.DEFAULT_SYSTEM_SCHEMAS);if(s){let e=eR(o?p`and nc.nspname ${o}`:void 0),t=p`
with table_privileges as (${e})
select *
from table_privileges
`;return i&&(t=p`${t} limit ${l(i)}`),r&&(t=p`${t} offset ${l(r)}`),{sql:t,zod:eL}}let c=p`
with table_privileges as (${eA})
select *
from table_privileges
`;return o&&(c=p`${c} where schema ${o}`),i&&(c=p`${c} limit ${l(i)}`),r&&(c=p`${c} offset ${l(r)}`),{sql:c,zod:eL}},retrieve:function({id:e,name:t,schema:a="public",scoped:n=!1}){if(n){let n=e?p`and c.oid = ${l(e)}`:p`and nc.nspname = ${l(a)} and c.relname = ${l(t)}`;return{sql:p`
with table_privileges as (${eR(n)})
select *
from table_privileges
`,zod:e$}}return e?{sql:p`
with table_privileges as (${eA})
select *
from table_privileges
where table_privileges.relation_id = ${l(e)};`,zod:e$}:{sql:p`
with table_privileges as (${eA})
select *
from table_privileges
where table_privileges.schema = ${l(a)}
  and table_privileges.name = ${l(t)}
`,zod:e$}},grant:function(e){return{sql:p`
do $$
begin
${E(e.map(({privilegeType:e,relationId:t,grantee:a,isGrantable:n})=>p`execute format('grant ${_(e)} on table %s to ${"public"===a.toLowerCase()?p`public`:o(a)} ${n?p`with grant option`:p``}', ${l(t)}::regclass);`),"\n")}
end $$;
`}},revoke:function(e){return{sql:p`
do $$
begin
${E(e.map(({privilegeType:e,relationId:t,grantee:a})=>p`execute format('revoke ${_(e)} on table %s from ${"public"===a.toLowerCase()?p`public`:o(a)}', ${l(t)}::regclass);`),"\n")}
end $$;
`}},zod:eO},publications:{list:function({limit:e,offset:t}={}){let a=p`with publications as (${ed}) select * from publications`;return e&&(a=p`${a} limit ${l(e)}`),t&&(a=p`${a} offset ${l(t)}`),{sql:a,zod:eE}},retrieve:function(e){return{sql:p`with publications as (${ed}) select * from publications where ${function(e){if("id"in e&&e.id)return p`${o("id")} = ${l(e.id)}`;if("name"in e&&e.name)return p`${o("name")} = ${l(e.name)}`;throw Error("Must provide either id or name")}(e)};`,zod:eu}},create:function({name:e,publish_insert:t=!1,publish_update:a=!1,publish_delete:n=!1,publish_truncate:i=!1,tables:r=null}){let s;s=null==r?p`FOR ALL TABLES`:0===r.length?p``:p`FOR TABLE ${E(r.map(e=>{if(!e.includes("."))return o(e);let[t,...a]=e.split("."),n=a.join(".");return p`${o(t)}.${o(n)}`}),",")}`;let c=[];return t&&c.push("insert"),a&&c.push("update"),n&&c.push("delete"),i&&c.push("truncate"),{sql:p`
CREATE PUBLICATION ${o(e)} ${s}
  WITH (publish = ${l(c.join(","))});`}},update:function(e,{name:t,owner:a,publish_insert:n,publish_update:i,publish_delete:r,publish_truncate:s,tables:c}){return{sql:p`
do $$
declare
  id oid := ${l(e)};
  old record;
  new_name text := ${void 0===t?l(null):l(t)};
  new_owner text := ${void 0===a?l(null):l(a)};
  new_publish_insert bool := ${l(n??null)};
  new_publish_update bool := ${l(i??null)};
  new_publish_delete bool := ${l(r??null)};
  new_publish_truncate bool := ${l(s??null)};
  new_tables text := ${void 0===c?l(null):l(null===c?"all tables":c.map(e=>{if(!e.includes("."))return o(e);let[t,...a]=e.split("."),n=a.join(".");return p`${o(t)}.${o(n)}`}).join(","))};
begin
  select * into old from pg_publication where oid = id;
  if old is null then
    raise exception 'Cannot find publication with id %', id;
  end if;

  if new_tables is null then
    null;
  elsif new_tables = 'all tables' then
    if old.puballtables then
      null;
    else
      -- Need to recreate because going from list of tables <-> all tables with alter is not possible.
      execute(format('drop publication %1$I; create publication %1$I for all tables;', old.pubname));
    end if;
  else
    if old.puballtables then
      -- Need to recreate because going from list of tables <-> all tables with alter is not possible.
      execute(format('drop publication %1$I; create publication %1$I;', old.pubname));
    elsif exists(select from pg_publication_rel where prpubid = id) then
      execute(
        format(
          'alter publication %I drop table %s',
          old.pubname,
          (select string_agg(prrelid::regclass::text, ', ') from pg_publication_rel where prpubid = id)
        )
      );
    end if;

    -- At this point the publication must have no tables.

    if new_tables != '' then
      execute(format('alter publication %I add table %s', old.pubname, new_tables));
    end if;
  end if;

  execute(
    format(
      'alter publication %I set (publish = %L);',
      old.pubname,
      concat_ws(
        ', ',
        case when coalesce(new_publish_insert, old.pubinsert) then 'insert' end,
        case when coalesce(new_publish_update, old.pubupdate) then 'update' end,
        case when coalesce(new_publish_delete, old.pubdelete) then 'delete' end,
        case when coalesce(new_publish_truncate, old.pubtruncate) then 'truncate' end
      )
    )
  );

  execute(format('alter publication %I owner to %I;', old.pubname, coalesce(new_owner, old.pubowner::regrole::name)));

  -- Using the same name in the rename clause gives an error, so only do it if the new name is different.
  if new_name is not null and new_name != old.pubname then
    execute(format('alter publication %I rename to %I;', old.pubname, coalesce(new_name, old.pubname)));
  end if;

  -- We need to retrieve the publication later, so we need a way to uniquely identify which publication this is.
  -- We can't rely on id because it gets changed if it got recreated.
  -- We use a temp table to store the unique name - DO blocks can't return a value.
  create temp table pg_meta_publication_tmp (name) on commit drop as values (coalesce(new_name, old.pubname));
end $$;
`}},remove:function(e){return{sql:p`DROP PUBLICATION IF EXISTS ${o(e.name)};`}},zod:em},extensions:w,config:{list:function({limit:e,offset:t}={}){let a=L;return e&&(a=p`${a} LIMIT ${l(e)}`),t&&(a=p`${a} OFFSET ${l(t)}`),{sql:a,zod:y}},zod:$},materializedViews:{list:function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:a,limit:i,offset:r,includeColumns:s=!0}={}){let o=es({includeColumns:s}),c=g(t,a,e?void 0:n.DEFAULT_SYSTEM_SCHEMAS);return c&&(o=p`${o} where schema ${c}`),i&&(o=p`${o} limit ${l(i)}`),r&&(o=p`${o} offset ${l(r)}`),{sql:o,zod:ei}},retrieve:function(e){let t=function(e){if("id"in e&&e.id)return p`${o("id")} = ${l(e.id)}`;if("name"in e&&e.name&&e.schema)return p`${o("name")} = ${l(e.name)} and ${o("schema")} = ${l(e.schema)}`;throw Error("Must provide either id or name and schema")}(e);return{sql:p`${es({includeColumns:!0})} where ${t};`,zod:er}},zod:en},foreignTables:{list:function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:a,limit:i,offset:r,includeColumns:s=!0}={}){let o=M({includeColumns:s}),c=g(t,a,e?void 0:n.DEFAULT_SYSTEM_SCHEMAS);return c&&(o=p`${o} where schema ${c}`),i&&(o=p`${o} limit ${l(i)}`),r&&(o=p`${o} offset ${l(r)}`),{sql:o,zod:U}},retrieve:function(e){return{sql:p`${M({includeColumns:!0})} where ${function(e){if("id"in e&&e.id)return p`${o("id")} = ${l(e.id)}`;if("name"in e&&e.name&&e.schema)return p`${o("name")} = ${l(e.name)} and ${o("schema")} = ${l(e.schema)}`;throw Error("Must provide either id or name and schema")}(e)};`,zod:k}},zod:z},views:{list:function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:a,limit:i,offset:r,includeColumns:s=!0}={}){let o=eZ({includeColumns:s}),c=g(t,a,e?void 0:n.DEFAULT_SYSTEM_SCHEMAS);return c&&(o=p`${o} where schema ${c}`),i&&(o=p`${o} limit ${l(i)}`),r&&(o=p`${o} offset ${l(r)}`),{sql:o,zod:eK}},retrieve:function(e){let t=function(e){if("id"in e&&e.id)return p`${o("id")} = ${l(e.id)}`;if("name"in e&&e.name&&e.schema)return p`${o("name")} = ${l(e.name)} and ${o("schema")} = ${l(e.schema)}`;throw Error("Must provide either id or name and schema")}(e);return{sql:p`${eZ({includeColumns:!0})} where ${t};`,zod:eQ}},zod:eV},policies:{list:function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:a,limit:i,offset:r}={}){let s=p`
    with policies as (${eo})
    select *
    from policies
    `,o=g(t,a,e?void 0:n.DEFAULT_SYSTEM_SCHEMAS);return o&&(s=p`${s}where schema ${o}`),i&&(s=p`${s} limit ${l(i)}`),r&&(s=p`${s} offset ${l(r)}`),{sql:s,zod:ec}},retrieve:function(e){return{sql:p`with policies as (${eo}) select * from policies where ${function(e){if("id"in e&&e.id)return p`id = ${l(e.id)}`;if("name"in e&&e.name&&e.schema&&e.table)return p`name = ${l(e.name)} AND schema = ${l(e.schema)} AND table = ${l(e.table)}`;throw Error("Must provide either id or name, schema and table")}(e)};`,zod:e_}},create:function({name:e,schema:t="public",table:a,definition:n,check:i,action:r="PERMISSIVE",command:s="ALL",roles:l=["public"]}){let c=E(l.map(o),", "),d=n?p`using (${n})`:p``,m=i?p`with check (${i})`:p``;return{sql:p`
create policy ${o(e)} on ${o(t)}.${o(a)}
  as ${_(r)}
  for ${_(s)}
  to ${c}
  ${d}
  ${m};`}},update:function(e,t){let{name:a,definition:n,check:i,roles:r}=t,s=p`ALTER POLICY ${o(e.name)} ON ${o(e.schema)}.${o(e.table)}`,l=void 0===a?p``:p`${s} RENAME TO ${o(a)};`,c=void 0===n?p``:p`${s} USING (${n});`,_=void 0===i?p``:p`${s} WITH CHECK (${i});`,d=void 0===r?p``:p`${s} TO ${E(r.map(o),", ")};`;return{sql:p`BEGIN; ${c} ${_} ${d} ${l} COMMIT;`}},remove:function(e){return{sql:p`DROP POLICY ${o(e.name)} ON ${o(e.schema)}.${o(e.table)};`}},zod:el},triggers:{list:function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:a,limit:i,offset:r}={}){let s=p`with triggers as (${eU}) select * from triggers`,o=g(t,a,e?void 0:n.DEFAULT_SYSTEM_SCHEMAS);return o&&(s=p`${s} where schema ${o}`),i&&(s=p`${s} limit ${l(i)}`),r&&(s=p`${s} offset ${l(r)}`),{sql:s,zod:eM}},retrieve:function(e){let t=function(e){if("id"in e&&e.id)return p`${o("id")} = ${l(e.id)}`;if("name"in e&&e.name&&e.table&&e.schema)return p`${o("name")} = ${l(e.name)} and ${o("schema")} = ${l(e.schema)} and ${o("table")} = ${l(e.table)}`;throw Error("Must provide either id or name, schema and table")}(e);return{sql:p`with triggers as (${eU}) select * from triggers where ${t};`,zod:eP}},create:function({name:e,schema:t="public",table:n,function_schema:i="public",function_name:r,function_args:s=[],activation:c,events:d,orientation:m,condition:u}){let g=p`${o(t)}.${o(n)}`,N=p`${o(i)}.${o(r)}`,b=E(d.map(_)," or "),f=m?p`for each ${_(m)}`:p``,h=u?p`when (${u})`:p``,T=s.length>0?E(s.map(l),","):p``;return{sql:p`create trigger ${o(e)} ${_(c)} ${b} on ${g} ${f} ${h} execute function ${N}(${T});`,zod:a.z.void()}},update:function(e,t){let n=p`${o(e.schema)}.${o(e.table)}`,i=p``;switch(t.enabled_mode){case"ORIGIN":i=p`alter table ${n} enable trigger ${o(e.name)};`;break;case"DISABLED":i=p`alter table ${n} disable trigger ${o(e.name)};`;break;case"REPLICA":case"ALWAYS":i=p`alter table ${n} enable ${_(t.enabled_mode)} trigger ${o(e.name)};`}let r=t.name&&t.name!==e.name?p`alter trigger ${o(e.name)} on ${n} rename to ${o(t.name)};`:p``;return{sql:p`begin; ${i}; ${r}; commit;`,zod:a.z.void()}},remove:function(e,{cascade:t=!1}={}){let n=p`${o(e.schema)}.${o(e.table)}`;return{sql:p`drop trigger ${o(e.name)} on ${n} ${t?p`cascade`:p``};`,zod:a.z.void()}},zod:ek},types:eG,version:{retrieve:function(){return{sql:eB,zod:eX}},zod:eX},indexes:{list:function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:a,limit:i,offset:r}={}){let s=p`
    with indexes as (${Q})
    select *
    from indexes
  `,o=g(t,a,e?void 0:n.DEFAULT_SYSTEM_SCHEMAS);return o&&(s=p`${s} where schema ${o}`),i&&(s=p`${s} limit ${l(i)}`),r&&(s=p`${s} offset ${l(r)}`),{sql:s,zod:ee}},retrieve:function({id:e}){return{sql:p`
    with indexes as (${Q})
    select *
    from indexes
    where id = ${l(e)};
  `,zod:et}},zod:Z},columnPrivileges:{list:function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:a,columnIds:i,relationName:r,limit:s,offset:o,scoped:c=!1}={}){if(c){let c=(({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:a,relationName:i,relationIds:r}={})=>{let s=[],o=g(t,a,e?void 0:n.DEFAULT_SYSTEM_SCHEMAS);o&&s.push(p`and nc.nspname ${o}`),i&&s.push(p`and c.relname = ${l(i)}`),r?.length&&s.push(p`and c.oid in (${E(r.map(l),",")})`);let c=E(s,"\n");return p`
with rel as (
  select
    c.oid,
    c.relname,
    c.relowner,
    c.relacl,
    nc.nspname
  from pg_class c
  join pg_namespace nc
    on nc.oid = c.relnamespace
  where c.relkind = any (array['r', 'v', 'm', 'f', 'p'])
    ${c}
),
roles as (
  select
    r.oid,
    r.rolname,
    pg_has_role(r.oid, 'USAGE') as is_member
  from pg_authid r
),
grantees as (
  select oid, rolname, is_member, false as is_public from roles
  union all
  select (0)::oid as oid, 'PUBLIC', false, true
),
priv as (
  -- Table-level ACLs apply to every live column of the relation.
  select
    a.attrelid,
    a.attnum,
    a.attname,
    r.relname,
    r.nspname,
    p.grantor,
    p.grantee,
    p.privilege_type as prtype,
    p.is_grantable as grantable
  from rel r
  cross join lateral aclexplode(coalesce(r.relacl, acldefault('r', r.relowner))) p
  join pg_attribute a
    on a.attrelid = r.oid
    and a.attnum > 0
    and not a.attisdropped
  where p.privilege_type = any (array['INSERT', 'SELECT', 'UPDATE', 'REFERENCES'])

  union

  -- Column-level ACLs.
  select
    a.attrelid,
    a.attnum,
    a.attname,
    r.relname,
    r.nspname,
    p.grantor,
    p.grantee,
    p.privilege_type,
    p.is_grantable
  from rel r
  join pg_attribute a
    on a.attrelid = r.oid
    and a.attnum > 0
    and not a.attisdropped
  cross join lateral aclexplode(coalesce(a.attacl, acldefault('c', r.relowner))) p
  where a.attacl is not null
    and p.privilege_type = any (array['INSERT', 'SELECT', 'UPDATE', 'REFERENCES'])
)
select
  (p.attrelid || '.' || p.attnum) as column_id,
  p.nspname as relation_schema,
  p.relname as relation_name,
  p.attname as column_name,
  coalesce(
    jsonb_agg(
      jsonb_build_object(
        'grantor', grantor.rolname,
        'grantee', grantee.rolname,
        'privilege_type', p.prtype,
        'is_grantable', p.grantable
      )
    ),
    '[]'
  ) as privileges
from priv p
join roles grantor
  on grantor.oid = p.grantor
join grantees grantee
  on grantee.oid = p.grantee
where grantor.is_member
   or grantee.is_member
   or grantee.is_public
group by
  p.attrelid,
  p.attnum,
  p.nspname,
  p.relname,
  p.attname
`})({includeSystemSchemas:e,includedSchemas:t,excludedSchemas:a,relationName:r,relationIds:i?.length?[...new Set(i.map(e=>e.split(".")[0]))]:void 0}),_=p`
  with column_privileges as (${c})
  select *
  from column_privileges
  `;return i?.length&&(_=p`${_} where column_id in (${E(i.map(l),",")})`),s&&(_=p`${_} limit ${l(s)}`),o&&(_=p`${_} offset ${l(o)}`),{sql:_,zod:h}}let _=p`
  with column_privileges as (${N})
  select *
  from column_privileges
  `,d=[],m=g(t,a,e?void 0:n.DEFAULT_SYSTEM_SCHEMAS);return m&&d.push(p`relation_schema ${m}`),r&&d.push(p`relation_name = ${l(r)}`),i?.length&&d.push(p`column_id in (${E(i.map(l),",")})`),d.length>0&&(_=p`${_} where ${E(d," and ")}`),s&&(_=p`${_} limit ${l(s)}`),o&&(_=p`${_} offset ${l(o)}`),{sql:_,zod:h}},grant:function(e){return{sql:p`
do $$
declare
  col record;
begin
${E(e.map(({privilegeType:e,columnId:t,grantee:a,isGrantable:n})=>{let[i,r]=t.split(".");return p`
select *
from pg_attribute a
where a.attrelid = ${l(i)}
  and a.attnum = ${l(r)}
into col;
execute format(
  'grant ${_(e)} (%I) on %s to ${"public"===a.toLowerCase()?p`public`:o(a)} ${n?p`with grant option`:p``}',
  col.attname,
  col.attrelid::regclass
);`}),"\n")}
end $$;
`}},revoke:function(e){return{sql:p`
do $$
declare
  col record;
begin
${E(e.map(({privilegeType:e,columnId:t,grantee:a})=>{let[n,i]=t.split(".");return p`
select *
from pg_attribute a
where a.attrelid = ${l(n)}
  and a.attnum = ${l(i)}
into col;
execute format(
  'revoke ${_(e)} (%I) on %s from ${"public"===a.toLowerCase()?p`public`:o(a)}',
  col.attname,
  col.attrelid::regclass
);`}),"\n")}
end $$;
`}},zod:f},query:tr}],850036)}]);

//# debugId=3067b2e3-b4ce-3545-6ed8-afe60106e38f