-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "accType" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tokens" (
    "id" SERIAL NOT NULL,
    "parent" INTEGER NOT NULL,
    "service" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL,
    "color" TEXT NOT NULL,
    "hasRefreshToken" BOOLEAN NOT NULL DEFAULT false,
    "otherParams" JSONB,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Areas" (
    "id" SERIAL NOT NULL,
    "parent" INTEGER NOT NULL,
    "enabled" BOOLEAN NOT NULL,
    "actionService" TEXT NOT NULL,
    "actionId" TEXT NOT NULL,
    "actionDes" TEXT NOT NULL,
    "actionParams" JSONB NOT NULL,
    "reactionService" TEXT NOT NULL,
    "reactionId" TEXT NOT NULL,
    "reactionDes" TEXT NOT NULL,
    "reactionParams" JSONB NOT NULL,
    "lastTrigger" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users.username_unique" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users.email_unique" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Tokens" ADD FOREIGN KEY ("parent") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Areas" ADD FOREIGN KEY ("parent") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
