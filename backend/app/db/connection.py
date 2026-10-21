from psycopg_pool import ConnectionPool

from core.config import settings

pool = ConnectionPool(
    conninfo=settings.database_url,
    min_size=2,
    max_size=10,
    open=False
)