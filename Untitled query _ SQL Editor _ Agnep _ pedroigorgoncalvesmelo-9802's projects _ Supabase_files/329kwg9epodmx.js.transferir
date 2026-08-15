;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="8f8ddbe4-e925-fb21-4427-575ca8bea497")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,46932,e=>{"use strict";e.s(["queryOptions",0,function(e){return e}])},938343,e=>{"use strict";e.s(["tableEditorKeys",0,{tableEditor:(e,t)=>["projects",e,"table-editor",t].filter(Boolean)}])},34479,664304,e=>{"use strict";e.i(850036);var t=e.i(479084);let n=({id:e,scoped:n=!1})=>e?n?t.safeSql`
    with base_table_info as (
        select
            c.oid::int8 as id,
            nc.nspname as schema,
            c.relname as name,
            c.relkind,
            c.relrowsecurity as rls_enabled,
            c.relforcerowsecurity as rls_forced,
            c.relreplident,
            c.relowner,
            obj_description(c.oid) as comment,
            fs.srvname as foreign_server_name,
            fdw.fdwname as foreign_data_wrapper_name,
            fdw_handler.proname as foreign_data_wrapper_handler
        from pg_class c
        join pg_namespace nc on nc.oid = c.relnamespace
        left join pg_foreign_table ft on ft.ftrelid = c.oid
        left join pg_foreign_server fs on fs.oid = ft.ftserver
        left join pg_foreign_data_wrapper fdw on fdw.oid = fs.srvfdw
        left join pg_proc fdw_handler on fdw.fdwhandler = fdw_handler.oid
        where c.oid = ${(0,t.literal)(e)}
            and not pg_is_other_temp_schema(nc.oid)
            and (
                pg_has_role(c.relowner, 'USAGE')
                or has_table_privilege(
                    c.oid,
                    'SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER'
                )
                or has_any_column_privilege(c.oid, 'SELECT, INSERT, UPDATE, REFERENCES')
            )
    ),
    table_stats as (
        select
            b.id,
            case
                when b.relreplident = 'd' then 'DEFAULT'
                when b.relreplident = 'i' then 'INDEX'
                when b.relreplident = 'f' then 'FULL'
                else 'NOTHING'
            end as replica_identity,
            pg_total_relation_size(format('%I.%I', b.schema, b.name))::int8 as bytes,
            pg_size_pretty(pg_total_relation_size(format('%I.%I', b.schema, b.name))) as size,
            pg_stat_get_live_tuples(b.id) as live_rows_estimate,
            pg_stat_get_dead_tuples(b.id) as dead_rows_estimate
        from base_table_info b
        where b.relkind in ('r', 'p')
    ),
    primary_keys as (
        select
            i.indrelid as table_id,
            jsonb_agg(
                jsonb_build_object(
                    'schema', n.nspname,
                    'table_name', c.relname,
                    'table_id', i.indrelid::int8,
                    'name', a.attname
                )
                order by array_position(i.indkey, a.attnum)
            ) as primary_keys
        from pg_index i
        join pg_class c on i.indrelid = c.oid
        join pg_namespace n on c.relnamespace = n.oid
		join pg_attribute a on a.attrelid = c.oid and a.attnum = any(i.indkey)
        where i.indisprimary
            and i.indrelid = ${(0,t.literal)(e)}
        group by i.indrelid
    ),
    index_cols as (
        select
            i.indrelid as table_id,
            i.indkey,
            array_agg(
                a.attname
                order by array_position(i.indkey, a.attnum)
            ) as columns
        from pg_index i
        join pg_class c on i.indrelid = c.oid
        join pg_attribute a on a.attrelid = c.oid
            and a.attnum = any(i.indkey)
        where i.indisunique
            and i.indisprimary = false
            and i.indrelid = ${(0,t.literal)(e)}
        group by i.indrelid, i.indkey
    ),
    unique_indexes as (
        select
            ic.table_id,
            jsonb_agg(
                jsonb_build_object(
                    'schema', n.nspname,
                    'table_name', c.relname,
                    'table_id', ic.table_id::int8,
                    'columns', ic.columns
                )
            ) as unique_indexes
        from index_cols ic
        join pg_class c on c.oid = ic.table_id
        join pg_namespace n on n.oid = c.relnamespace
        group by ic.table_id
    ),
    relationships as (
        select
            c.conrelid as source_id,
            c.confrelid as target_id,
            jsonb_build_object(
                'id', c.oid::int8,
                'constraint_name', c.conname,
                'deletion_action', c.confdeltype,
                'update_action', c.confupdtype,
                'source_schema', nsa.nspname,
                'source_table_name', csa.relname,
                'source_column_name', sa.attname,
                'target_table_schema', nta.nspname,
                'target_table_name', cta.relname,
                'target_column_name', ta.attname
            ) as rel_info
        from pg_constraint c
        join pg_class csa on c.conrelid = csa.oid
        join pg_namespace nsa on csa.relnamespace = nsa.oid
        join pg_attribute sa on (sa.attrelid = c.conrelid and sa.attnum = any(c.conkey))
        join pg_class cta on c.confrelid = cta.oid
        join pg_namespace nta on cta.relnamespace = nta.oid
        join pg_attribute ta on (ta.attrelid = c.confrelid and ta.attnum = any(c.confkey))
        where c.contype = 'f'
            and (c.conrelid = ${(0,t.literal)(e)} or c.confrelid = ${(0,t.literal)(e)})
    ),
    columns as (
        select
            a.attrelid as table_id,
            jsonb_agg(jsonb_build_object(
                'id', (a.attrelid || '.' || a.attnum),
                'table_id', c.oid::int8,
                'schema', nc.nspname,
                'table', c.relname,
                'ordinal_position', a.attnum,
                'name', a.attname,
                'default_value', case
                    when a.atthasdef then pg_get_expr(ad.adbin, ad.adrelid)
                    else null
                end,
                'data_type', case
                    when t.typtype = 'd' then
                        case
                            when bt.typelem <> 0::oid and bt.typlen = -1 then 'ARRAY'
                            when nbt.nspname = 'pg_catalog' then format_type(t.typbasetype, null)
                            else 'USER-DEFINED'
                        end
                    else
                        case
                            when t.typelem <> 0::oid and t.typlen = -1 then 'ARRAY'
                            when nt.nspname = 'pg_catalog' then format_type(a.atttypid, null)
                            else 'USER-DEFINED'
                        end
                end,
                'format', coalesce(bt.typname, t.typname),
                'format_schema', coalesce(nbt.nspname, nt.nspname),
                'is_identity', a.attidentity in ('a', 'd'),
                'identity_generation', case a.attidentity
                    when 'a' then 'ALWAYS'
                    when 'd' then 'BY DEFAULT'
                    else null
                end,
                'is_generated', a.attgenerated in ('s'),
                'is_nullable', not (a.attnotnull or t.typtype = 'd' and t.typnotnull),
                'is_updatable', (
                    b.relkind in ('r', 'p') or
                    (b.relkind in ('v', 'f') and pg_column_is_updatable(b.id, a.attnum, false))
                ),
                'is_unique', uniques.table_id is not null,
                'check', check_constraints.definition,
                'comment', col_description(c.oid, a.attnum),
                'enums', coalesce(
                    (
                        select jsonb_agg(e.enumlabel order by e.enumsortorder)
                        from pg_catalog.pg_enum e
                        where e.enumtypid = coalesce(bt.oid, t.oid)
                            or e.enumtypid = coalesce(bt.typelem, t.typelem)
                    ),
                    '[]'::jsonb
                )
            ) order by a.attnum) as columns
        from pg_attribute a
        join base_table_info b on a.attrelid = b.id
        join pg_class c on a.attrelid = c.oid
        join pg_namespace nc on c.relnamespace = nc.oid
        left join pg_attrdef ad on (a.attrelid = ad.adrelid and a.attnum = ad.adnum)
        join pg_type t on a.atttypid = t.oid
        join pg_namespace nt on t.typnamespace = nt.oid
        left join pg_type bt on (t.typtype = 'd' and t.typbasetype = bt.oid)
        left join pg_namespace nbt on bt.typnamespace = nbt.oid
        left join (
            select
                conrelid as table_id,
                conkey[1] as ordinal_position
            from pg_catalog.pg_constraint
            where contype = 'u' and cardinality(conkey) = 1
                and conrelid = ${(0,t.literal)(e)}
            group by conrelid, conkey[1]
        ) as uniques on uniques.table_id = a.attrelid and uniques.ordinal_position = a.attnum
        left join (
            select distinct on (conrelid, conkey[1])
                conrelid as table_id,
                conkey[1] as ordinal_position,
                substring(
                    pg_get_constraintdef(oid, true),
                    8,
                    length(pg_get_constraintdef(oid, true)) - 8
                ) as definition
            from pg_constraint
            where contype = 'c' and cardinality(conkey) = 1
                and conrelid = ${(0,t.literal)(e)}
            order by conrelid, conkey[1], oid asc
        ) as check_constraints on check_constraints.table_id = a.attrelid
                            and check_constraints.ordinal_position = a.attnum
        where a.attnum > 0
        and not a.attisdropped
        group by a.attrelid
    )
    select
        case b.relkind
            when 'r' then jsonb_build_object(
                'entity_type', b.relkind,
                'id', b.id,
                'schema', b.schema,
                'name', b.name,
                'rls_enabled', b.rls_enabled,
                'rls_forced', b.rls_forced,
                'replica_identity', ts.replica_identity,
                'bytes', ts.bytes,
                'size', ts.size,
                'live_rows_estimate', ts.live_rows_estimate,
                'dead_rows_estimate', ts.dead_rows_estimate,
                'comment', b.comment,
                'primary_keys', coalesce(pk.primary_keys, '[]'::jsonb),
                'unique_indexes', coalesce(ui.unique_indexes, '[]'::jsonb),
                'relationships', coalesce(
                    (select jsonb_agg(r.rel_info)
                    from relationships r
                    where r.source_id = b.id or r.target_id = b.id),
                    '[]'::jsonb
                ),
                'columns', coalesce(c.columns, '[]'::jsonb)
            )
            when 'p' then jsonb_build_object(
                'entity_type', b.relkind,
                'id', b.id,
                'schema', b.schema,
                'name', b.name,
                'rls_enabled', b.rls_enabled,
                'rls_forced', b.rls_forced,
                'replica_identity', ts.replica_identity,
                'bytes', ts.bytes,
                'size', ts.size,
                'live_rows_estimate', ts.live_rows_estimate,
                'dead_rows_estimate', ts.dead_rows_estimate,
                'comment', b.comment,
                'primary_keys', coalesce(pk.primary_keys, '[]'::jsonb),
                'unique_indexes', coalesce(ui.unique_indexes, '[]'::jsonb),
                'relationships', coalesce(
                    (select jsonb_agg(r.rel_info)
                    from relationships r
                    where r.source_id = b.id or r.target_id = b.id),
                    '[]'::jsonb
                ),
                'columns', coalesce(c.columns, '[]'::jsonb)
            )
            when 'v' then jsonb_build_object(
                'entity_type', b.relkind,
                'id', b.id,
                'schema', b.schema,
                'name', b.name,
                'is_updatable', (pg_relation_is_updatable(b.id, false) & 20) = 20,
                'comment', b.comment,
                'columns', coalesce(c.columns, '[]'::jsonb)
            )
            when 'm' then jsonb_build_object(
                'entity_type', b.relkind,
                'id', b.id,
                'schema', b.schema,
                'name', b.name,
                'is_populated', true,
                'comment', b.comment,
                'columns', coalesce(c.columns, '[]'::jsonb)
            )
            when 'f' then jsonb_build_object(
                'entity_type', b.relkind,
                'id', b.id,
                'schema', b.schema,
                'name', b.name,
                'comment', b.comment,
                'foreign_server_name', b.foreign_server_name,
                'foreign_data_wrapper_name', b.foreign_data_wrapper_name,
                'foreign_data_wrapper_handler', b.foreign_data_wrapper_handler,
                'columns', coalesce(c.columns, '[]'::jsonb)
            )
        end as entity
    from base_table_info b
    left join table_stats ts on b.id = ts.id
    left join primary_keys pk on b.id = pk.table_id
    left join unique_indexes ui on b.id = ui.table_id
    left join columns c on b.id = c.table_id;
  `:t.safeSql`
    -- FROZEN legacy path (pgMetaScopedIntrospection off): do not edit -- it must
    -- keep matching production behavior until the flag cleanup deletes it.
    with base_table_info as (
        select
            c.oid::int8 as id,
            nc.nspname as schema,
            c.relname as name,
            c.relkind,
            c.relrowsecurity as rls_enabled,
            c.relforcerowsecurity as rls_forced,
            c.relreplident,
            c.relowner,
            obj_description(c.oid) as comment,
            fs.srvname as foreign_server_name,
            fdw.fdwname as foreign_data_wrapper_name,
            fdw_handler.proname as foreign_data_wrapper_handler
        from pg_class c
        join pg_namespace nc on nc.oid = c.relnamespace
        left join pg_foreign_table ft on ft.ftrelid = c.oid
        left join pg_foreign_server fs on fs.oid = ft.ftserver
        left join pg_foreign_data_wrapper fdw on fdw.oid = fs.srvfdw
        left join pg_proc fdw_handler on fdw.fdwhandler = fdw_handler.oid
        where c.oid = ${(0,t.literal)(e)}
            and not pg_is_other_temp_schema(nc.oid)
            and (
                pg_has_role(c.relowner, 'USAGE')
                or has_table_privilege(
                    c.oid,
                    'SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER'
                )
                or has_any_column_privilege(c.oid, 'SELECT, INSERT, UPDATE, REFERENCES')
            )
    ),
    table_stats as (
        select
            b.id,
            case
                when b.relreplident = 'd' then 'DEFAULT'
                when b.relreplident = 'i' then 'INDEX'
                when b.relreplident = 'f' then 'FULL'
                else 'NOTHING'
            end as replica_identity,
            pg_total_relation_size(format('%I.%I', b.schema, b.name))::int8 as bytes,
            pg_size_pretty(pg_total_relation_size(format('%I.%I', b.schema, b.name))) as size,
            pg_stat_get_live_tuples(b.id) as live_rows_estimate,
            pg_stat_get_dead_tuples(b.id) as dead_rows_estimate
        from base_table_info b
        where b.relkind in ('r', 'p')
    ),
    primary_keys as (
        select
            i.indrelid as table_id,
            jsonb_agg(
                jsonb_build_object(
                    'schema', n.nspname,
                    'table_name', c.relname,
                    'table_id', i.indrelid::int8,
                    'name', a.attname
                )
                order by array_position(i.indkey, a.attnum)
            ) as primary_keys
        from pg_index i
        join pg_class c on i.indrelid = c.oid
        join pg_namespace n on c.relnamespace = n.oid
		join pg_attribute a on a.attrelid = c.oid and a.attnum = any(i.indkey)
        where i.indisprimary
        group by i.indrelid
    ),
    index_cols as (
        select
            i.indrelid as table_id,
            i.indkey,
            array_agg(
                a.attname
                order by array_position(i.indkey, a.attnum)
            ) as columns
        from pg_index i
        join pg_class c on i.indrelid = c.oid
        join pg_attribute a on a.attrelid = c.oid
            and a.attnum = any(i.indkey)
        where i.indisunique
            and i.indisprimary = false
        group by i.indrelid, i.indkey
    ),
    unique_indexes as (
        select
            ic.table_id,
            jsonb_agg(
                jsonb_build_object(
                    'schema', n.nspname,
                    'table_name', c.relname,
                    'table_id', ic.table_id::int8,
                    'columns', ic.columns
                )
            ) as unique_indexes
        from index_cols ic
        join pg_class c on c.oid = ic.table_id
        join pg_namespace n on n.oid = c.relnamespace
        group by ic.table_id
    ),
    relationships as (
        select
            c.conrelid as source_id,
            c.confrelid as target_id,
            jsonb_build_object(
                'id', c.oid::int8,
                'constraint_name', c.conname,
                'deletion_action', c.confdeltype,
                'update_action', c.confupdtype,
                'source_schema', nsa.nspname,
                'source_table_name', csa.relname,
                'source_column_name', sa.attname,
                'target_table_schema', nta.nspname,
                'target_table_name', cta.relname,
                'target_column_name', ta.attname
            ) as rel_info
        from pg_constraint c
        join pg_class csa on c.conrelid = csa.oid
        join pg_namespace nsa on csa.relnamespace = nsa.oid
        join pg_attribute sa on (sa.attrelid = c.conrelid and sa.attnum = any(c.conkey))
        join pg_class cta on c.confrelid = cta.oid
        join pg_namespace nta on cta.relnamespace = nta.oid
        join pg_attribute ta on (ta.attrelid = c.confrelid and ta.attnum = any(c.confkey))
        where c.contype = 'f'
    ),
    columns as (
        select
            a.attrelid as table_id,
            jsonb_agg(jsonb_build_object(
                'id', (a.attrelid || '.' || a.attnum),
                'table_id', c.oid::int8,
                'schema', nc.nspname,
                'table', c.relname,
                'ordinal_position', a.attnum,
                'name', a.attname,
                'default_value', case
                    when a.atthasdef then pg_get_expr(ad.adbin, ad.adrelid)
                    else null
                end,
                'data_type', case
                    when t.typtype = 'd' then
                        case
                            when bt.typelem <> 0::oid and bt.typlen = -1 then 'ARRAY'
                            when nbt.nspname = 'pg_catalog' then format_type(t.typbasetype, null)
                            else 'USER-DEFINED'
                        end
                    else
                        case
                            when t.typelem <> 0::oid and t.typlen = -1 then 'ARRAY'
                            when nt.nspname = 'pg_catalog' then format_type(a.atttypid, null)
                            else 'USER-DEFINED'
                        end
                end,
                'format', coalesce(bt.typname, t.typname),
                'format_schema', coalesce(nbt.nspname, nt.nspname),
                'is_identity', a.attidentity in ('a', 'd'),
                'identity_generation', case a.attidentity
                    when 'a' then 'ALWAYS'
                    when 'd' then 'BY DEFAULT'
                    else null
                end,
                'is_generated', a.attgenerated in ('s'),
                'is_nullable', not (a.attnotnull or t.typtype = 'd' and t.typnotnull),
                'is_updatable', (
                    b.relkind in ('r', 'p') or
                    (b.relkind in ('v', 'f') and pg_column_is_updatable(b.id, a.attnum, false))
                ),
                'is_unique', uniques.table_id is not null,
                'check', check_constraints.definition,
                'comment', col_description(c.oid, a.attnum),
                'enums', coalesce(
                    (
                        select jsonb_agg(e.enumlabel order by e.enumsortorder)
                        from pg_catalog.pg_enum e
                        where e.enumtypid = coalesce(bt.oid, t.oid)
                            or e.enumtypid = coalesce(bt.typelem, t.typelem)
                    ),
                    '[]'::jsonb
                )
            ) order by a.attnum) as columns
        from pg_attribute a
        join base_table_info b on a.attrelid = b.id
        join pg_class c on a.attrelid = c.oid
        join pg_namespace nc on c.relnamespace = nc.oid
        left join pg_attrdef ad on (a.attrelid = ad.adrelid and a.attnum = ad.adnum)
        join pg_type t on a.atttypid = t.oid
        join pg_namespace nt on t.typnamespace = nt.oid
        left join pg_type bt on (t.typtype = 'd' and t.typbasetype = bt.oid)
        left join pg_namespace nbt on bt.typnamespace = nbt.oid
        left join (
            select
                conrelid as table_id,
                conkey[1] as ordinal_position
            from pg_catalog.pg_constraint
            where contype = 'u' and cardinality(conkey) = 1
            group by conrelid, conkey[1]
        ) as uniques on uniques.table_id = a.attrelid and uniques.ordinal_position = a.attnum
        left join (
            select distinct on (conrelid, conkey[1])
                conrelid as table_id,
                conkey[1] as ordinal_position,
                substring(
                    pg_get_constraintdef(oid, true),
                    8,
                    length(pg_get_constraintdef(oid, true)) - 8
                ) as definition
            from pg_constraint
            where contype = 'c' and cardinality(conkey) = 1
            order by conrelid, conkey[1], oid asc
        ) as check_constraints on check_constraints.table_id = a.attrelid
                            and check_constraints.ordinal_position = a.attnum
        where a.attnum > 0
        and not a.attisdropped
        group by a.attrelid
    )
    select
        case b.relkind
            when 'r' then jsonb_build_object(
                'entity_type', b.relkind,
                'id', b.id,
                'schema', b.schema,
                'name', b.name,
                'rls_enabled', b.rls_enabled,
                'rls_forced', b.rls_forced,
                'replica_identity', ts.replica_identity,
                'bytes', ts.bytes,
                'size', ts.size,
                'live_rows_estimate', ts.live_rows_estimate,
                'dead_rows_estimate', ts.dead_rows_estimate,
                'comment', b.comment,
                'primary_keys', coalesce(pk.primary_keys, '[]'::jsonb),
                'unique_indexes', coalesce(ui.unique_indexes, '[]'::jsonb),
                'relationships', coalesce(
                    (select jsonb_agg(r.rel_info)
                    from relationships r
                    where r.source_id = b.id or r.target_id = b.id),
                    '[]'::jsonb
                ),
                'columns', coalesce(c.columns, '[]'::jsonb)
            )
            when 'p' then jsonb_build_object(
                'entity_type', b.relkind,
                'id', b.id,
                'schema', b.schema,
                'name', b.name,
                'rls_enabled', b.rls_enabled,
                'rls_forced', b.rls_forced,
                'replica_identity', ts.replica_identity,
                'bytes', ts.bytes,
                'size', ts.size,
                'live_rows_estimate', ts.live_rows_estimate,
                'dead_rows_estimate', ts.dead_rows_estimate,
                'comment', b.comment,
                'primary_keys', coalesce(pk.primary_keys, '[]'::jsonb),
                'unique_indexes', coalesce(ui.unique_indexes, '[]'::jsonb),
                'relationships', coalesce(
                    (select jsonb_agg(r.rel_info)
                    from relationships r
                    where r.source_id = b.id or r.target_id = b.id),
                    '[]'::jsonb
                ),
                'columns', coalesce(c.columns, '[]'::jsonb)
            )
            when 'v' then jsonb_build_object(
                'entity_type', b.relkind,
                'id', b.id,
                'schema', b.schema,
                'name', b.name,
                'is_updatable', (pg_relation_is_updatable(b.id, false) & 20) = 20,
                'comment', b.comment,
                'columns', coalesce(c.columns, '[]'::jsonb)
            )
            when 'm' then jsonb_build_object(
                'entity_type', b.relkind,
                'id', b.id,
                'schema', b.schema,
                'name', b.name,
                'is_populated', true,
                'comment', b.comment,
                'columns', coalesce(c.columns, '[]'::jsonb)
            )
            when 'f' then jsonb_build_object(
                'entity_type', b.relkind,
                'id', b.id,
                'schema', b.schema,
                'name', b.name,
                'comment', b.comment,
                'foreign_server_name', b.foreign_server_name,
                'foreign_data_wrapper_name', b.foreign_data_wrapper_name,
                'foreign_data_wrapper_handler', b.foreign_data_wrapper_handler,
                'columns', coalesce(c.columns, '[]'::jsonb)
            )
        end as entity
    from base_table_info b
    left join table_stats ts on b.id = ts.id
    left join primary_keys pk on b.id = pk.table_id
    left join unique_indexes ui on b.id = ui.table_id
    left join columns c on b.id = c.table_id;
  `:t.safeSql``;e.s(["getDuplicateRowsSQL",0,({duplicatedTableName:e,sourceTableName:n,sourceTableSchema:a})=>t.safeSql`INSERT INTO ${(0,t.ident)(a)}.${(0,t.ident)(e)} SELECT * FROM ${(0,t.ident)(a)}.${(0,t.ident)(n)};`,"getDuplicateTableSQL",0,({comment:e,duplicatedTableName:n,sourceTableName:a,sourceTableSchema:i})=>{let r=t.safeSql`CREATE TABLE ${(0,t.ident)(i)}.${(0,t.ident)(n)} (LIKE ${(0,t.ident)(i)}.${(0,t.ident)(a)} INCLUDING ALL);`,o=void 0!=e?t.safeSql`comment on table ${(0,t.ident)(i)}.${(0,t.ident)(n)} is ${(0,t.literal)(e)};`:t.safeSql``;return(0,t.joinSqlFragments)([r,o],"\n")},"getTableEditorSql",0,n],664304);var a=e.i(46932),i=e.i(125356);e.i(128328);var r=e.i(657588),o=e.i(938343),s=e.i(617361);let l="pgMetaScopedIntrospection";async function d({projectRef:e,connectionString:t,id:a,scoped:i=!1},r){if(!a)throw Error("id is required");let o=n({id:a,scoped:i}),{result:l}=await (0,s.executeSql)({projectRef:e,connectionString:t,sql:o,queryKey:["table-editor",a]},r);return l[0]?.entity??null}let c=({projectRef:e,connectionString:t,id:n,scoped:i})=>(0,a.queryOptions)({queryKey:[...o.tableEditorKeys.tableEditor(e,n),{scoped:!!i}],queryFn:({signal:a})=>d({projectRef:e,connectionString:t,id:n,scoped:i},a)});e.s(["PG_META_SCOPED_INTROSPECTION_FLAG",0,l,"getTableEditor",0,d,"prefetchTableEditor",0,function(e,{projectRef:t,connectionString:n,id:a,scoped:i}){return e.fetchQuery(c({projectRef:t,connectionString:n,id:a,scoped:i}))},"tableEditorQueryOptions",0,c,"useTableEditorQuery",0,({projectRef:e,connectionString:t,id:n},{enabled:a=!0,...o}={})=>{let s=!!(0,r.useFlag)(l);return(0,i.useQuery)({...c({projectRef:e,connectionString:t,id:n,scoped:s}),enabled:a&&void 0!==e&&void 0!==n&&!isNaN(n),refetchOnWindowFocus:!1,refetchOnMount:!1,staleTime:3e5,...o})}],34479)},309584,e=>{"use strict";e.i(128328);var t=e.i(657588),n=e.i(416340),a=e.i(34479),i=e.i(10429);let r=!1,o=!1,s=!1,l=()=>{},d=new Promise(e=>{l=e}),c=()=>{o||(o=!0,l())};e.s(["isScopedIntrospection",0,()=>r,"scopedIntrospectionReady",0,()=>(s||(s=!0,setTimeout(c,5e3)),d),"useSyncScopedIntrospection",0,()=>{let{hasLoaded:e}=(0,t.useFeatureFlags)(),o=!!(0,t.useFlag)(a.PG_META_SCOPED_INTROSPECTION_FLAG);(0,n.useEffect)(()=>{r=o,(e||!i.IS_PLATFORM)&&c()},[o,e])}])},698269,123346,e=>{"use strict";let t=(0,e.i(679709).default)("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);e.s(["default",0,t],123346),e.s(["Lock",0,t],698269)},602089,583896,e=>{"use strict";var t=e.i(221628),n=e.i(774107),a=e.i(416340),i=e.i(135205),r=e.i(425277),o=e.i(457323);function s(e){let t=(0,o.useConstant)(()=>(0,i.motionValue)(e)),{isStatic:n}=(0,a.useContext)(r.MotionConfigContext);if(n){let[,n]=(0,a.useState)(e);(0,a.useEffect)(()=>t.on("change",n),[])}return t}e.s(["useMotionValue",0,s],583896);var l=e.i(191163),d=e.i(638863),c=e.i(52967),p=e.i(818155);function u(e){return"number"==typeof e?e:parseFloat(e)}function _(e,t={}){let{isStatic:n}=(0,a.useContext)(r.MotionConfigContext),i=(0,a.useRef)(null),o=s((0,c.isMotionValue)(e)?u(e.get()):e),m=(0,a.useRef)(o.get()),b=(0,a.useRef)(()=>{}),f=()=>{let e=i.current;e&&0===e.time&&e.sample(p.frameData.delta),y(),i.current=(0,l.animateValue)({keyframes:[o.get(),m.current],velocity:o.getVelocity(),type:"spring",restDelta:.001,restSpeed:.01,...t,onUpdate:b.current})},y=()=>{i.current&&i.current.stop()};return(0,a.useInsertionEffect)(()=>o.attach((e,t)=>n?t(e):(m.current=e,b.current=t,p.frame.update(f),o.get()),y),[JSON.stringify(t)]),(0,d.useIsomorphicLayoutEffect)(()=>{if((0,c.isMotionValue)(e))return e.on("change",e=>o.set(u(e)))},[o]),o}var m=e.i(843778);let b=(0,a.memo)(({size:e=24,loading:i=!1,className:r,allowHoverEffect:o=!1})=>{let l=Math.max(1.5,e/46),d=(0,a.useRef)(null),[c,p]=(0,a.useState)(!1),u=s(0),b=s(0),f=_(u,{stiffness:300,damping:30}),y=_(b,{stiffness:300,damping:30});return(0,t.jsxs)("div",{className:(0,m.cn)("text-brand-600 flex justify-center items-center relative",r),style:{width:e,height:e,position:"relative"},children:[(0,t.jsx)("div",{ref:d,className:"absolute flex items-center justify-center",style:{width:2*e,height:2*e,left:-e/2,top:-e/2},onMouseMove:e=>{if(!o||!d.current)return;let t=d.current.getBoundingClientRect(),n=t.left+t.width/2,a=t.top+t.height/2,i=e.clientX-n,r=e.clientY-a;u.set(i/5),b.set(r/5)},onMouseEnter:()=>p(!0),onMouseLeave:()=>{p(!1),u.set(0),b.set(0)}}),(0,t.jsxs)(n.motion.svg,{width:e,height:e,viewBox:"0 0 46 46",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,t.jsx)(n.motion.path,{fillRule:"evenodd",clipRule:"evenodd",d:"M23 1.78677L44.2132 23L23 44.2132L1.7868 23L23 1.78677ZM23 0.372559L23.7071 1.07967L44.9203 22.2929L45.6274 23L44.9203 23.7071L23.7071 44.9203L23 45.6274L22.2929 44.9203L1.07969 23.7071L0.372583 23L1.07969 22.2929L22.2929 1.07967L23 0.372559Z",fill:"none",stroke:"currentColor",strokeWidth:l,initial:{rotate:0},animate:i?{rotate:360}:{rotate:10*!!c},transition:i?{type:"spring",stiffness:60,damping:10,repeat:1/0,repeatType:"loop"}:{type:"spring",stiffness:300,damping:30},style:{transformBox:"view-box",transformOrigin:"center"}}),(0,t.jsx)(n.motion.path,{fillRule:"evenodd",clipRule:"evenodd",d:"M30 23C30 26.866 26.866 30 23 30C19.134 30 16 26.866 16 23C16 19.134 19.134 16 23 16C26.866 16 30 19.134 30 23ZM31 23C31 27.4183 27.4183 31 23 31C18.5817 31 15 27.4183 15 23C15 18.5817 18.5817 15 23 15C27.4183 15 31 18.5817 31 23Z",fill:"none",stroke:"currentColor",strokeWidth:l,initial:{scale:1},animate:i?{scale:[1,1.1,1]}:{scale:c?1.1:1},style:{x:f,y:y,transformBox:"view-box",transformOrigin:"center"},transition:i?{duration:2,repeat:1/0,ease:"easeInOut",repeatType:"loop"}:{type:"spring",stiffness:300,damping:30}})]})]})});e.s(["AiIconAnimation",0,b],602089)},790792,e=>{"use strict";let t=(0,e.i(679709).default)("Table2",[["path",{d:"M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",key:"gugj83"}]]);e.s(["Table2",0,t],790792)},40586,645451,e=>{"use strict";let t=(0,e.i(679709).default)("GitBranch",[["line",{x1:"6",x2:"6",y1:"3",y2:"15",key:"17qcm7"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["path",{d:"M18 9a9 9 0 0 1-9 9",key:"n2h4wq"}]]);e.s(["default",0,t],645451),e.s(["GitBranch",0,t],40586)},906766,e=>{"use strict";let t=(0,e.i(679709).default)("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]);e.s(["MessageSquare",0,t],906766)},63519,e=>{"use strict";var t=e.i(221628);e.i(128328);var n=e.i(524906),a=e.i(158639),i=e.i(572617),r=e.i(416340),o=e.i(801026),s=e.i(813663),l=e.i(19583);let d={table:["r","v","m","f","p"],sql:["sql"],explorer:["notebook","query","chat"]},c="explorer-home",p=e=>`supabase_recent_items_${e}`,u=()=>({activeTab:null,openTabs:[],tabsMap:{},previewTabId:void 0,recentItems:[]}),_=e=>`supabase_studio_tabs_${e}`,m=e=>e.label||e.metadata?.name||"Untitled",b=(e,t)=>{let n=m(t);e.label=n,e.metadata={...e.metadata,...t.metadata,name:n}};function f(e){let t=function(e){if(!e)return[];let t=n.safeLocalStorage.getItem(p(e));try{return JSON.parse(t??'{"items": []}').items}catch(e){return[]}}(e),{openTabs:a,activeTab:r,tabsMap:s,previewTabId:c}=function(e){if(!e)return u();let t=n.safeLocalStorage.getItem(_(e));if(!t)return u();try{let e=JSON.parse(t??JSON.stringify(u()));if(!e.openTabs||!Array.isArray(e.openTabs)||!e.tabsMap||"object"!=typeof e.tabsMap)return u();return e}catch(e){return u()}}(e),f=new Map,y=(0,o.proxy)({recentItems:t,addRecentItem:e=>{let t=y.recentItems.find(t=>t.id===e.id);if(t){t.timestamp=Date.now(),b(t,e);return}let n={id:e.id,type:e.type,label:m(e),timestamp:Date.now(),metadata:e.metadata};y.recentItems.unshift(n);let[a,r]=(0,i.default)(y.recentItems,e=>{if(d.table.includes(e.type))return e});y.recentItems=[...a.slice(0,8),...r]},clearRecentItems:()=>{y.recentItems=[]},removeRecentItem:e=>{y.recentItems=y.recentItems.filter(t=>t.id!==e)},removeRecentItems:e=>{y.recentItems=y.recentItems.filter(t=>!e.includes(t.id))},removeRecentItemsByType:e=>{y.recentItems=y.recentItems.filter(t=>t.type!==e)},getRecentItemsByType:e=>y.recentItems.filter(t=>t.type===e),activeTab:r,openTabs:a,tabsMap:s,previewTabId:c,hasTab:e=>!!y.tabsMap[e],addTab:e=>{if(!y.tabsMap[e.id]||y.activeTab!==e.id){if(y.tabsMap[e.id]){y.activeTab=e.id,e.isPreview||y.addRecentItem(e);return}if(!1===e.isPreview){y.openTabs=[...y.openTabs,e.id],y.tabsMap[e.id]=e,y.activeTab=e.id,y.addRecentItem(e);return}y.previewTabId&&(y.openTabs=y.openTabs.filter(e=>e!==y.previewTabId),delete y.tabsMap[y.previewTabId]),y.tabsMap[e.id]={...e,isPreview:!0},y.openTabs=[...y.openTabs,e.id],y.previewTabId=e.id,y.activeTab=e.id}},ensurePinnedTab:e=>{y.tabsMap[e.id]||(y.tabsMap[e.id]=e,y.openTabs=[e.id,...y.openTabs])},activatePinnedTab:e=>{y.ensurePinnedTab(e),y.activeTab=e.id},updateTab:(e,t)=>{let n=y.tabsMap[e];if(n){if("label"in t){n.label=t.label,"string"==typeof t.label&&n.metadata&&(n.metadata.name=t.label);let a=y.recentItems.find(t=>t.id===e);a&&b(a,n)}if("scrollTop"in t&&n.metadata&&(n.metadata.scrollTop=t.scrollTop),void 0!==t.sqlSource){n.metadata?n.metadata.sqlSource=t.sqlSource:n.metadata={sqlSource:t.sqlSource};let a=y.recentItems.find(t=>t.id===e);a&&b(a,n)}}},removeTab:e=>{if(y.tabsMap[e]?.closable===!1)return;let t=y.openTabs.indexOf(e);y.openTabs=y.openTabs.filter(t=>t!==e),delete y.tabsMap[e],y.previewTabId===e&&(y.previewTabId=void 0),e===y.activeTab&&(y.activeTab=y.openTabs[t-1]||y.openTabs[t+1]||null)},removeTabs:e=>{e.length&&e.forEach(e=>y.removeTab(e))},reorderTabs:(e,t)=>{let n=[...y.openTabs],[a]=n.splice(e,1);n.splice(t,0,a),y.openTabs=n},makeTabActive:e=>{let t=y.tabsMap[e];t&&(y.activeTab=t.id)},makeTabPermanent:e=>{let t=y.tabsMap[e];t?.isPreview&&(t.isPreview=!1,y.previewTabId=void 0,y.addRecentItem(t))},makeActiveTabPermanent:()=>!!(y.activeTab&&y.tabsMap[y.activeTab]?.isPreview)&&(y.makeTabPermanent(y.activeTab),!0),handleTabNavigation:(e,t)=>{let n=y.tabsMap[e];if(n)switch(y.activeTab=e,!n.isPreview&&!1!==n.closable&&y.addRecentItem(n),n.type){case"sql":let a=t.query.schema||"public";t.push(`/project/${t.query.ref}/sql/${n.metadata?.sqlId}?schema=${a}`);break;case"notebook":t.push(`/project/${t.query.ref}/explorer/notebook/${n.metadata?.notebookId}`);break;case"query":t.push(`/project/${t.query.ref}/explorer/query/${n.metadata?.queryId}`);break;case"chat":t.push(`/project/${t.query.ref}/explorer/chat/${n.metadata?.chatId}`);break;case"explorer-home":t.push(`/project/${t.query.ref}/explorer`);break;case"r":case"v":case"m":case"f":case"p":t.push((0,l.buildTableEditorUrl)({projectRef:t.query.ref,tableId:n.metadata?.tableId,schema:n.metadata?.schema}))}},handlerRegistrationVersion:0,registerTabTypeHandler:(e,t)=>(f.set(e,t),y.handlerRegistrationVersion++,()=>{f.get(e)===t&&(f.delete(e),y.handlerRegistrationVersion++)}),getTabStatusIndicator:e=>f.get(e)?.StatusIndicator,getCloseConfirmation:e=>{let t=new Map;for(let n of e){let e=y.tabsMap[n];if(!e)continue;let a=t.get(e.type);a?a.push(e):t.set(e.type,[e])}for(let[e,n]of t){let t=f.get(e)?.confirmClose?.(n);if(t)return t}return null},closeTabs:e=>{let t=e.map(e=>y.tabsMap[e]).filter(e=>void 0!==e&&!1!==e.closable);y.removeTabs(t.map(e=>e.id)),t.forEach(e=>f.get(e.type)?.onClose?.(e))},handleTabClose:({id:e,router:t,editor:n,onClose:a,onClearDashboardHistory:i})=>{let r=y.tabsMap[e],o=(n?Object.values(y.tabsMap).filter(e=>d[n]?.includes(e.type)):[]).map(e=>e.id),s=o.indexOf(e),l=s===o.length-1,c=1===o.length?void 0:l?o[s-1]:o[s+1],{[e]:p,...u}=y.tabsMap;if(y.tabsMap=u,r){let t=[...y.openTabs].filter(t=>t!==e);y.openTabs=t}if(y.previewTabId===e&&(y.previewTabId=void 0),y.activeTab===e||"new"===e)if(c)y.activeTab=c,y.handleTabNavigation(c,t);else switch(i(),r?.type){case"sql":t.push(`/project/${t.query.ref}/sql`);break;case"notebook":case"query":case"chat":t.push(`/project/${t.query.ref}/explorer`);break;case"r":case"v":case"m":case"f":case"p":t.push(`/project/${t.query.ref}/editor`);break;default:t.push(`/project/${t.query.ref}/${"table"===n?"editor":"sql"}`)}a?.(e),r&&f.get(r.type)?.onClose?.(r)},handleTabCloseAll:({editor:e,router:t,onClearDashboardHistory:n})=>{let a=y.openTabs.filter(t=>{let n=y.tabsMap[t];return void 0!==n&&d[e].includes(n.type)});y.closeTabs(a),n(),t.push(`/project/${t.query.ref}/${"table"===e?"editor":e}`)},handleTabDragEnd:(e,t,n,a)=>{let i=y.tabsMap[n];i?.isPreview&&y.makeTabPermanent(n);let r=[...y.openTabs];r.splice(e,1),r.splice(t,0,n),y.openTabs=r,y.activeTab=n,y.handleTabNavigation(n,a)}});return y}let y=(0,r.createContext)(f(""));e.s(["EXPLORER_HOME_TAB",0,{id:c,type:"explorer-home",label:"Home",isPreview:!1,closable:!1},"EXPLORER_HOME_TAB_ID",0,c,"TabsStateContext",0,y,"TabsStateContextProvider",0,({children:e})=>{let{ref:i}=(0,a.useParams)(),[s,l]=(0,r.useState)(f(i??""));return(0,r.useEffect)(()=>{i&&l(f(i??""))},[i]),(0,r.useEffect)(()=>{if(i)return(0,o.subscribe)(s,()=>{n.safeLocalStorage.setItem(_(i),JSON.stringify({activeTab:s.activeTab,openTabs:s.openTabs,tabsMap:s.tabsMap,previewTabId:s.previewTabId})),n.safeLocalStorage.setItem(p(i),JSON.stringify({items:s.recentItems}))})},[i,s]),(0,t.jsx)(y.Provider,{value:s,children:e})},"createTabId",0,function(e,t){switch(e){case"r":return`r-${t.id}`;case"v":return`v-${t.id}`;case"m":return`m-${t.id}`;case"f":return`f-${t.id}`;case"p":return`p-${t.id}`;case"sql":return`sql-${t.id}`;case"notebook":return`notebook-${t.id}`;case"query":return`query-${t.id}`;case"chat":return`chat-${t.id}`;default:return""}},"editorEntityTypes",0,d,"useTabsStateSnapshot",0,e=>{let t=(0,r.useContext)(y);return(0,s.useSnapshot)(t,e)}])},608793,e=>{"use strict";let t="u"<typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__;e.s(["DEBUG_BUILD",0,t])},342474,(e,t,n)=>{"use strict";t.exports=["chrome 111","edge 111","firefox 111","safari 16.4"]},350916,(e,t,n)=>{"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a={UNDERSCORE_GLOBAL_ERROR_ROUTE:function(){return s},UNDERSCORE_GLOBAL_ERROR_ROUTE_ENTRY:function(){return l},UNDERSCORE_NOT_FOUND_ROUTE:function(){return r},UNDERSCORE_NOT_FOUND_ROUTE_ENTRY:function(){return o}};for(var i in a)Object.defineProperty(n,i,{enumerable:!0,get:a[i]});let r="/_not-found",o=`${r}/page`,s="/_global-error",l=`${s}/page`},798119,(e,t,n)=>{"use strict";var a,i=e.i(302016);Object.defineProperty(n,"__esModule",{value:!0});var r={APP_CLIENT_INTERNALS:function(){return en},APP_PATHS_MANIFEST:function(){return T},APP_PATH_ROUTES_MANIFEST:function(){return h},AdapterOutputType:function(){return p},BARREL_OPTIMIZATION_PREFIX:function(){return Y},BLOCKED_PAGES:function(){return B},BUILD_ID_FILE:function(){return $},BUILD_MANIFEST:function(){return I},CLIENT_PUBLIC_FILES_PATH:function(){return W},CLIENT_REFERENCE_MANIFEST:function(){return z},CLIENT_STATIC_FILES_PATH:function(){return G},CLIENT_STATIC_FILES_RUNTIME_MAIN:function(){return ee},CLIENT_STATIC_FILES_RUNTIME_MAIN_APP:function(){return et},CLIENT_STATIC_FILES_RUNTIME_POLYFILLS:function(){return er},CLIENT_STATIC_FILES_RUNTIME_POLYFILLS_SYMBOL:function(){return eo},CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH:function(){return ea},CLIENT_STATIC_FILES_RUNTIME_WEBPACK:function(){return ei},COMPILER_INDEXES:function(){return c},COMPILER_NAMES:function(){return d},CONFIG_FILES:function(){return F},DEFAULT_RUNTIME_WEBPACK:function(){return es},DEFAULT_SANS_SERIF_FONT:function(){return eu},DEFAULT_SERIF_FONT:function(){return ep},DEV_CLIENT_MIDDLEWARE_MANIFEST:function(){return U},DEV_CLIENT_PAGES_MANIFEST:function(){return L},DYNAMIC_CSS_MANIFEST:function(){return Z},EDGE_RUNTIME_WEBPACK:function(){return el},EDGE_UNSUPPORTED_NODE_APIS:function(){return ey},EXPORT_DETAIL:function(){return v},EXPORT_MARKER:function(){return j},FUNCTIONS_CONFIG_MANIFEST:function(){return R},IMAGES_MANIFEST:function(){return A},INTERCEPTION_ROUTE_REWRITE_MANIFEST:function(){return J},MIDDLEWARE_BUILD_MANIFEST:function(){return K},MIDDLEWARE_MANIFEST:function(){return P},MIDDLEWARE_REACT_LOADABLE_MANIFEST:function(){return X},MODERN_BROWSERSLIST_TARGET:function(){return s.default},NEXT_BUILTIN_DOCUMENT:function(){return V},NEXT_FONT_MANIFEST:function(){return S},PAGES_MANIFEST:function(){return g},PHASE_ANALYZE:function(){return _},PHASE_DEVELOPMENT_SERVER:function(){return f},PHASE_EXPORT:function(){return u},PHASE_INFO:function(){return E},PHASE_PRODUCTION_BUILD:function(){return m},PHASE_PRODUCTION_SERVER:function(){return b},PHASE_TEST:function(){return y},PREFETCH_HINTS:function(){return O},PRERENDER_MANIFEST:function(){return N},REACT_LOADABLE_MANIFEST:function(){return x},ROUTES_MANIFEST:function(){return D},RSC_MODULE_TYPES:function(){return ef},SERVER_DIRECTORY:function(){return q},SERVER_FILES_MANIFEST:function(){return C},SERVER_PROPS_ID:function(){return ec},SERVER_REFERENCE_MANIFEST:function(){return H},STATIC_PROPS_ID:function(){return ed},STATIC_STATUS_PAGES:function(){return e_},STRING_LITERAL_DROP_BUNDLE:function(){return Q},SUBRESOURCE_INTEGRITY_MANIFEST:function(){return w},SYSTEM_ENTRYPOINTS:function(){return eE},TRACE_OUTPUT_VERSION:function(){return em},TURBOPACK_CLIENT_BUILD_MANIFEST:function(){return M},TURBOPACK_CLIENT_MIDDLEWARE_MANIFEST:function(){return k},TURBO_TRACE_DEFAULT_MEMORY_LIMIT:function(){return eb},UNDERSCORE_GLOBAL_ERROR_ROUTE:function(){return l.UNDERSCORE_GLOBAL_ERROR_ROUTE},UNDERSCORE_GLOBAL_ERROR_ROUTE_ENTRY:function(){return l.UNDERSCORE_GLOBAL_ERROR_ROUTE_ENTRY},UNDERSCORE_NOT_FOUND_ROUTE:function(){return l.UNDERSCORE_NOT_FOUND_ROUTE},UNDERSCORE_NOT_FOUND_ROUTE_ENTRY:function(){return l.UNDERSCORE_NOT_FOUND_ROUTE_ENTRY}};for(var o in r)Object.defineProperty(n,o,{enumerable:!0,get:r[o]});let s=e.r(2879)._(e.r(342474)),l=e.r(350916),d={client:"client",server:"server",edgeServer:"edge-server"},c={[d.client]:0,[d.server]:1,[d.edgeServer]:2};var p=((a={}).PAGES="PAGES",a.PAGES_API="PAGES_API",a.APP_PAGE="APP_PAGE",a.APP_ROUTE="APP_ROUTE",a.PRERENDER="PRERENDER",a.STATIC_FILE="STATIC_FILE",a.MIDDLEWARE="MIDDLEWARE",a);let u="phase-export",_="phase-analyze",m="phase-production-build",b="phase-production-server",f="phase-development-server",y="phase-test",E="phase-info",g="pages-manifest.json",T="app-paths-manifest.json",h="app-path-routes-manifest.json",I="build-manifest.json",R="functions-config-manifest.json",w="subresource-integrity-manifest",S="next-font-manifest",j="export-marker.json",v="export-detail.json",N="prerender-manifest.json",O="prefetch-hints.json",D="routes-manifest.json",A="images-manifest.json",C="required-server-files",L="_devPagesManifest.json",P="middleware-manifest.json",k="_clientMiddlewareManifest.js",M="client-build-manifest.json",U="_devMiddlewareManifest.json",x="react-loadable-manifest.json",q="server",F=["next.config.js","next.config.mjs","next.config.ts",...i.default?.features?.typescript?["next.config.mts"]:[]],$="BUILD_ID",B=["/_document","/_app","/_error"],W="public",G="static",Q="__NEXT_DROP_CLIENT_FILE__",V="__NEXT_BUILTIN_DOCUMENT__",Y="__barrel_optimize__",z="client-reference-manifest",H="server-reference-manifest",K="middleware-build-manifest",X="middleware-react-loadable-manifest",J="interception-route-rewrite-manifest",Z="dynamic-css-manifest",ee="main",et=`${ee}-app`,en="app-pages-internals",ea="react-refresh",ei="webpack",er="polyfills",eo=Symbol(er),es="webpack-runtime",el="edge-runtime-webpack",ed="__N_SSG",ec="__N_SSP",ep={name:"Times New Roman",xAvgCharWidth:821,azAvgWidth:854.3953488372093,unitsPerEm:2048},eu={name:"Arial",xAvgCharWidth:904,azAvgWidth:934.5116279069767,unitsPerEm:2048},e_=["/500"],em=1,eb=6e3,ef={client:"client",server:"server"},ey=["clearImmediate","setImmediate","BroadcastChannel","ByteLengthQueuingStrategy","CompressionStream","CountQueuingStrategy","DecompressionStream","DomException","MessageChannel","MessageEvent","MessagePort","ReadableByteStreamController","ReadableStreamBYOBRequest","ReadableStreamDefaultController","TransformStreamDefaultController","WritableStreamDefaultController"],eE=new Set([ee,ea,et]);("function"==typeof n.default||"object"==typeof n.default&&null!==n.default)&&void 0===n.default.__esModule&&(Object.defineProperty(n.default,"__esModule",{value:!0}),Object.assign(n.default,n),t.exports=n.default)},613923,(e,t,n)=>{t.exports=e.r(798119)},636047,726973,3694,859791,623705,e=>{"use strict";var t,n=e.i(221628),a=e.i(988829),i=e.i(934806),r=e.i(827157),o=e.i(608793),s=e.i(302016),l=e.i(613923);function d(e,t){let n,d;return(n=s.default.env.NEXT_PHASE===l.PHASE_PRODUCTION_BUILD,(d=!!t&&function(e){if(e.$$typeof!==Symbol.for("react.server.reference"))return!1;let{type:t}=function(e){let t=parseInt(e.slice(0,2),16),n=t>>1&63,a=Array(6);for(let e=0;e<6;e++){let t=n>>5-e&1;a[e]=1===t}return{type:1==(t>>7&1)?"use-cache":"server-action",usedArgs:a,hasRestArgs:1==(1&t)}}(e.$$id);return"use-cache"===t}(t))&&o.DEBUG_BUILD&&i.debug.log("Skipping span creation in Cache Components context"),n||d)?t(new r.SentryNonRecordingSpan({traceId:"00000000000000000000000000000000",spanId:"0000000000000000"})):(0,a.startSpan)(e,t)}e.s(["startSpan",0,d],726973),e.i(128328);var c=e.i(298650),p=e.i(416340),u=e.i(801026),_=e.i(813663),m=((t={}).EDIT_CELL_CONTENT="edit_cell_content",t.ADD_ROW="add_row",t.DELETE_ROW="delete_row",t);function b(e){return"delete_row"===e.type}function f(e){return"edit_cell_content"===e.type}e.s(["QueuedOperationType",()=>m,"isAddRowOperation",0,function(e){return"add_row"===e.type},"isDeleteRowOperation",0,b,"isEditCellContentOperation",0,f],3694);var y=e.i(824183);function E(e){return"__tempId"in e&&"string"==typeof e.__tempId}e.s(["isPendingAddRow",0,E,"isPendingDeleteRow",0,function(e){return"__isDeleted"in e&&!0===e.__isDeleted}],859791);var g=e.i(962217),T=e.i(48189);let h="__originalRowIdentifiers";function I(e,t){let n=e[h];return{...(0,T.isObject)(n)?n:t}}function R(e,t){return{...e,[h]:{...t}}}function w(e){if(e.type===m.EDIT_CELL_CONTENT){let{columnName:t,rowIdentifiers:n}=e.payload,a=Object.entries(n).sort(([e],[t])=>e.localeCompare(t)).map(([e,t])=>`${e}:${t}`).join("|");return`${e.type}:${e.tableId}:${t}:${a}`}if(e.type===m.ADD_ROW)return`${e.type}:${e.tableId}:${e.payload.tempId}`;if(e.type===m.DELETE_ROW){let{rowIdentifiers:t}=e.payload,n=Object.entries(t).sort(([e],[t])=>e.localeCompare(t)).map(([e,t])=>`${e}:${t}`).join("|");return`${e.type}:${e.tableId}:${n}`}throw Error(`Unknown operation type: ${e.type}`)}function S(e,t){let n=Object.entries(t);return 0!==n.length&&n.every(([t,n])=>e[t]===n)}function j(e,t){let n=e[h];return S((0,T.isObject)(n)?n:e,t)}e.s(["formatGridDataWithOperationValues",0,({operations:e,rows:t})=>{let n=t.slice();return e.forEach(e=>{if(e.type===m.EDIT_CELL_CONTENT){let{rowIdentifiers:t,columnName:a,newValue:i}=e.payload,r=n.findIndex(e=>j(e,t));-1!==r&&(n[r]=R({...n[r],[a]:i},t))}else if(e.type===m.ADD_ROW){let{tempId:t,rowData:a}=e.payload,i=Number(t),r=n.findIndex(e=>E(e)&&e.__tempId===t);if(r>=0)n[r]={...n[r],...a,__tempId:t};else{let e={...a,idx:i,__tempId:t};n.unshift(e)}}else if(e.type===m.DELETE_ROW){let{rowIdentifiers:t}=e.payload,a=n.findIndex(e=>j(e,t));-1!==a&&(n[a]=R({...n[a],__isDeleted:!0},t))}}),n},"generateTableChangeKey",0,w,"getStableRowIdentifiers",0,I,"queueCellEditWithOptimisticUpdate",0,function({queueOperation:e,tableId:t,table:n,row:a,rowIdentifiers:i,columnName:r,oldValue:o,newValue:s,enumArrayColumns:l}){let d=I(a,i);E(a)&&(d.__tempId=a.__tempId),e({type:m.EDIT_CELL_CONTENT,tableId:t,payload:{rowIdentifiers:d,columnName:r,oldValue:o,newValue:s,table:n,enumArrayColumns:l}})},"queueRowAddWithOptimisticUpdate",0,function({queueOperation:e,tableId:t,table:n,rowData:a,enumArrayColumns:i}){let r=String(-Date.now());e({type:m.ADD_ROW,tableId:t,payload:{tempId:r,rowData:a,table:n,enumArrayColumns:i}})},"queueRowDeletesWithOptimisticUpdate",0,function({rows:e,table:t,queueOperation:n,projectRef:a}){if(!a)return void console.error("Cannot queue row deletes: projectRef is required");if(!(0,g.isTableLike)(t))return void console.error("Cannot queue row deletes: table must be a TableLike entity");if(0===t.primary_keys.length)return void console.error("Cannot queue row deletes: table has no primary keys");for(let a of e){let e={};t.primary_keys.forEach(t=>{e[t.name]=a[t.name]});let i=I(a,e);E(a)&&(i.__tempId=a.__tempId),n({type:m.DELETE_ROW,tableId:t.id,payload:{rowIdentifiers:i,originalRow:a,table:t}})}},"rowMatchesIdentifiers",0,S],623705);let v=()=>{let e=(0,u.proxy)({rowsPerPage:100,setRowsPerPage:t=>{e.rowsPerPage=t},ui:{open:"none"},get sidePanel(){return"side-panel"===e.ui.open?e.ui.sidePanel:void 0},get confirmationDialog(){return"confirmation-dialog"===e.ui.open?e.ui.confirmationDialog:void 0},closeSidePanel:()=>{e.ui={open:"none"}},closeConfirmationDialog:()=>{e.ui={open:"none"}},onAddSchema:()=>{e.ui={open:"side-panel",sidePanel:{type:"schema",mode:"new"}}},onAddTable:t=>{d({name:"table_creator.opened",op:"ui.action"},e=>{e.setAttribute("table_creator.opened",1)}),e.ui={open:"side-panel",sidePanel:{type:"table",mode:"new",templateData:t}}},onEditTable:()=>{e.ui={open:"side-panel",sidePanel:{type:"table",mode:"edit"}}},onDuplicateTable:()=>{e.ui={open:"side-panel",sidePanel:{type:"table",mode:"duplicate"}}},onDeleteTable:()=>{e.ui={open:"confirmation-dialog",confirmationDialog:{type:"table",isDeleteWithCascade:!1}}},onDeleteView:()=>{e.ui={open:"confirmation-dialog",confirmationDialog:{type:"view",isDeleteWithCascade:!1}}},onDeleteMaterializedView:()=>{e.ui={open:"confirmation-dialog",confirmationDialog:{type:"materialized-view",isDeleteWithCascade:!1}}},onAddColumn:()=>{e.ui={open:"side-panel",sidePanel:{type:"column"}}},onEditColumn:t=>{e.ui={open:"side-panel",sidePanel:{type:"column",column:t}}},onDeleteColumn:t=>{e.ui={open:"confirmation-dialog",confirmationDialog:{type:"column",column:t,isDeleteWithCascade:!1}}},onAddRow:()=>{e.ui={open:"side-panel",sidePanel:{type:"row"}}},onEditRow:t=>{e.ui={open:"side-panel",sidePanel:{type:"row",row:t}}},onDeleteRows:(t,n={numRows:0,allRowsSelected:!1,callback:()=>{}})=>{let{numRows:a,allRowsSelected:i,callback:r}=n;e.ui={open:"confirmation-dialog",confirmationDialog:{type:"row",rows:t,numRows:a,allRowsSelected:i,callback:r}}},onExpandJSONEditor:t=>{e.ui={open:"side-panel",sidePanel:{type:"json",jsonValue:t}}},onExpandTextEditor:(t,n)=>{e.ui={open:"side-panel",sidePanel:{type:"cell",value:{column:t,row:n}}}},onEditForeignKeyColumnValue:t=>{e.ui={open:"side-panel",sidePanel:{type:"foreign-row-selector",foreignKey:t}}},onImportData:t=>{e.ui={open:"side-panel",sidePanel:{type:"csv-import",file:t}}},toggleViewOperationQueue:()=>{"side-panel"===e.ui.open&&"operation-queue"===e.ui.sidePanel.type?e.closeSidePanel():e.ui={open:"side-panel",sidePanel:{type:"operation-queue"}}},toggleConfirmationIsWithCascade:t=>{"confirmation-dialog"===e.ui.open&&("column"===e.ui.confirmationDialog.type||"table"===e.ui.confirmationDialog.type||"view"===e.ui.confirmationDialog.type||"materialized-view"===e.ui.confirmationDialog.type)&&(e.ui.confirmationDialog.isDeleteWithCascade=t??!e.ui.confirmationDialog.isDeleteWithCascade)},operationQueue:{operations:[],status:"idle"},queueOperation:t=>{let n=()=>{0===e.operationQueue.operations.length?e.operationQueue.status="idle":"idle"===e.operationQueue.status&&(e.operationQueue.status="pending")};if(t.type===m.DELETE_ROW){let a=function(e,t){let n=t.payload.rowIdentifiers,a=t.payload.originalRow;if(E(a)){let n=a.__tempId,i=w({type:m.ADD_ROW,tableId:t.tableId,payload:{tempId:n,rowData:a,table:t.payload.table}});return{action:"skip",filteredOperations:e.filter(e=>e.id!==i).filter(e=>!f(e)||e.payload.rowIdentifiers.__tempId!==n)}}return{action:"add",filteredOperations:e.filter(e=>{var a;return a=t.tableId,!(e.tableId===a&&(e.type===m.EDIT_CELL_CONTENT||e.type===m.DELETE_ROW)&&S(e.payload.rowIdentifiers,n))})}}(e.operationQueue.operations,t);if(e.operationQueue.operations=a.filteredOperations,"skip"===a.action)return void n()}if(t.type===m.EDIT_CELL_CONTENT){let a=function(e,t){let n=t.payload.rowIdentifiers;if(e.filter(b).some(e=>e.tableId===t.tableId&&Object.entries(e.payload.rowIdentifiers).every(([e,t])=>n[e]===t)))return{action:"reject",reason:"Cannot edit a cell on a row that is pending deletion. Remove the delete operation first."};let a=n.__tempId;if(a){let n=e.findIndex(e=>e.type===m.ADD_ROW&&e.tableId===t.tableId&&e.payload.tempId===a);if(n>=0){let a=[...e],i=a[n];if(i.type===m.ADD_ROW){let e={...i.payload};e.rowData={...e.rowData,[t.payload.columnName]:t.payload.newValue},a[n]={...i,payload:e,timestamp:Date.now()}}return{action:"merge",updatedOperations:a}}}return{action:"add"}}(e.operationQueue.operations,t);if("reject"===a.action)return void console.warn(a.reason);if("merge"===a.action){e.operationQueue.operations=a.updatedOperations,n();return}}let{operations:a}=function(e,t){let n=w(t),a=e.findIndex(e=>e.id===n),i={...t,id:n,timestamp:Date.now()};if(a>=0){let t=[...e],n=e[a];if(i.type===m.EDIT_CELL_CONTENT&&n.type===m.EDIT_CELL_CONTENT){i.payload.oldValue=n.payload.oldValue;let{oldValue:e,newValue:r}=i.payload;if("number"==typeof e&&Number(e)===Number(r)||"object"==typeof r&&(0,y.default)((0,T.tryParseJson)(e),r)||e===r)return t.splice(a,1),{operations:t}}return t[a]=i,{operations:t}}return{operations:[...e,i]}}(e.operationQueue.operations,t);e.operationQueue.operations=a,n()},clearQueue:()=>{e.operationQueue.operations=[],e.operationQueue.status="idle"},removeOperation:t=>{e.operationQueue.operations=e.operationQueue.operations.filter(e=>e.id!==t),0===e.operationQueue.operations.length&&(e.operationQueue.status="idle")},undoLatestOperation:()=>{e.operationQueue.operations=e.operationQueue.operations.slice(0,-1),0===e.operationQueue.operations.length&&(e.operationQueue.status="idle")},setQueueStatus:t=>{e.operationQueue.status=t},get hasPendingOperations(){return e.operationQueue.operations.length>0},hasPendingCellChange:(t,n,a)=>{let i=w({type:m.EDIT_CELL_CONTENT,tableId:t,payload:{columnName:a,rowIdentifiers:n}});return e.operationQueue.operations.some(e=>e.id===i)},tablesToIgnorePreflightCheck:[],setTableToIgnorePreflightCheck:t=>{let n=new Set(e.tablesToIgnorePreflightCheck);n.add(t),e.tablesToIgnorePreflightCheck=[...n]}});return e},N=(0,p.createContext)(v());e.s(["TABLE_EDITOR_DEFAULT_ROWS_PER_PAGE",0,100,"TableEditorStateContext",0,N,"TableEditorStateContextProvider",0,({children:e})=>{let t=(0,c.useConstant)(v);return(0,n.jsx)(N.Provider,{value:t,children:e})},"useTableEditorStateSnapshot",0,e=>{let t=(0,p.useContext)(N);return(0,_.useSnapshot)(t,e)}],636047)}]);

//# debugId=8f8ddbe4-e925-fb21-4427-575ca8bea497