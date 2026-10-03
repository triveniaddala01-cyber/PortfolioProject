[1mdiff --git a/backend/database.py b/backend/database.py[m
[1mindex 3e593df..d2bc350 100644[m
[1m--- a/backend/database.py[m
[1m+++ b/backend/database.py[m
[36m@@ -1,10 +1,12 @@[m
[31m-import os[m
 from sqlalchemy import create_engine[m
 from sqlalchemy.orm import declarative_base, sessionmaker[m
 [m
[31m-DATABASE_URL = os.getenv("DATABASE_URL")[m
[32m+[m[32mDATABASE_URL = "sqlite:///./portfolio.db"[m
 [m
[31m-engine = create_engine(DATABASE_URL)[m
[32m+[m[32mengine = create_engine([m
[32m+[m[32m    DATABASE_URL,[m
[32m+[m[32m    connect_args={"check_same_thread": False}[m
[32m+[m[32m)[m
 [m
 SessionLocal = sessionmaker([m
     autocommit=False,[m
