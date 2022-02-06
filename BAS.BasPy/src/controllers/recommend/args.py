from flask_restful import reqparse

recommend_args = reqparse.RequestParser()
recommend_args.add_argument("userAccountId", dest='user_account_id', help='User account id is required',
                            type=int, required=True)
recommend_args.add_argument("page", type=int, default=1, required=False)
recommend_args.add_argument("pageSize", dest='page_size', type=int, default=20, required=False)
