"""Application configuration settings."""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    ENVIRONMENT: str = "development"
    DATABASE_URL: str = (
        "postgresql://sachetsewa_user:change_this_password@localhost:5432/sachetsewa_db"
    )
    JWT_SECRET: str = "change_this_to_a_secure_random_secret_at_least_32_chars"
    MAX_UPLOAD_MB: int = 10
    UPLOAD_DIR: str = "./uploads"
    ALLOWED_ORIGIN: str = "http://localhost:5173"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
