class Permission:
    USERS_READ = 1
    USERS_CREATE = 2
    USERS_MANAGE = 3

MAX_SECRET = 30
API_KEYS = {
    '10010d7ec0db4e65880f2a928ed41d42':[ Permission.USERS_READ, Permission.USERS_CREATE, Permission.USERS_MANAGE ],
    'ceea17a17a114a0aa61b79607a46433f':[ Permission.USERS_READ, Permission.USERS_CREATE, Permission.USERS_MANAGE ],
    'bdd54f37d3d44f4bb396863409d95483':[ Permission.USERS_READ, Permission.USERS_CREATE, Permission.USERS_MANAGE ],
    'ac5538209efe493ba2be13cc180be933':[ Permission.USERS_READ, Permission.USERS_CREATE ],
    '48143a8499a948fc949338df156fb62b':[ Permission.USERS_CREATE ],
    '0c4f4c1e617b4f26b3e1be8f3581c04f':[ Permission.USERS_READ, Permission.USERS_CREATE ],
    'fa0a0ecafcac45eb8518efd8798ee5a1':[ Permission.USERS_READ ],
    'bfb4cd8cb78e444f98beb5f80eedaf51':[ Permission.USERS_READ ],
    '81f340ed08d94305b7a3abe0191630d2':[ Permission.USERS_READ ],
    '792367be620446aca4a3a80184348331':[ Permission.USERS_READ ],
}

UPLOAD_FOLDER = './upload'