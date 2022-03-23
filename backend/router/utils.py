from fastapi import HTTPException, Request

JWT_SECRET_KEY = "69a55a371d0e0cdda9a582fb774f767b1940a54089e2d2b7392d9c8a2a6f3a74"
ALGORITHM = "HS256"


def verify_JWT_header(req: Request):
    token = req.headers.get("Authorization", False)
    if not token:
        raise HTTPException(
            status_code=401, detail="Invalid Authorization (Header Loss)"
        )

    return token
