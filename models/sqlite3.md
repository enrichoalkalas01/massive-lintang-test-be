# SQLite3 Commands For This Repo

1. Create database, from repo root execute:

    ```bash
    $ sqlite3 database.db
    ```

2. Create tables:

    - Create `posts` table;

        ```sql
        create table if not exists posts (
            id integer primary key autoincrement,
            username varchar(25) not null default 'Anonymous',
            txt varchar(300) not null default 'This is a post',
            created_at datetime default current_timestamp,
            updated_at datetime default current_timestamp,
            status integer not null default 1
        );
        ```
    
    - Create `products` table;

        ```sql
        create table if not exists products (
            id integer primary key autoincrement,
            product_name varchar(25) not null default 'Product X',
            product_price integer not null default 17000,
            created_at datetime default current_timestamp,
            updated_at datetime default current_timestamp,
            status integer not null default 1
        );
        ```

    - Show table using `.tables`
    - Show table schema using `.schema tableName`
    
3. Create triggers for automatic update `updated_at` datetime when data is updated.

    - Create trigger on `posts` and `products` table:
      
        ```sql
        CREATE TRIGGER last_update_trigger2
        AFTER UPDATE
        ON products
        FOR EACH ROW
        BEGIN
        UPDATE products SET updated_at = CURRENT_TIMESTAMP WHERE id = old.id;
        END
        ```
    
    - List all created triggers:

        ```sql
        select * from sqlite_master where type = 'trigger';
        ```