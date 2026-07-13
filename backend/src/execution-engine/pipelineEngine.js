import PipelineExecution from "../models/pipelineExecution.model.js";

/**
 * ===================================================
 * Pipeline Execution Engine
 * ===================================================
 * Responsible for executing pipeline stages one by one.
 * ===================================================
 */

const STAGE_DELAY = 3000;

/**
 * ===========================================
 * Start Pipeline Execution
 * ===========================================
 */

export async function startPipelineExecution(
    executionId
) {
    const execution =
        await PipelineExecution.findById(
            executionId
        );

    if (!execution) {
        return;
    }

    execution.status = "RUNNING";

    execution.logs.push({
        level: "INFO",
        message: "Pipeline execution started.",
    });

    await execution.save();

    executeNextStage(
        executionId,
        0
    );
}

/**
 * ===========================================
 * Execute Next Stage
 * ===========================================
 */

async function executeNextStage(
    executionId,
    stageIndex
) {
    const execution =
        await PipelineExecution.findById(
            executionId
        );

    if (!execution) {
        return;
    }

    if (
        stageIndex >=
        execution.stages.length
    ) {
        execution.status = "SUCCESS";

        execution.finishedAt =
            new Date();

        execution.duration =
            execution.finishedAt -
            execution.startedAt;

        execution.logs.push({
            level: "SUCCESS",
            message: "Pipeline completed successfully.",
        });

        await execution.save();

        return;
    }

    const stage =
        execution.stages[stageIndex];

    stage.status = "RUNNING";

    stage.startedAt = new Date();

    execution.logs.push({
        level: "INFO",
        message: `${stage.name} started.`,
    });

    await execution.save();

    setTimeout(
        async () => {
            await completeStage(
                executionId,
                stageIndex
            );
        },
        STAGE_DELAY
    );
}

/**
 * ===========================================
 * Complete Stage
 * ===========================================
 */

async function completeStage(
    executionId,
    stageIndex
) {
    const execution =
        await PipelineExecution.findById(
            executionId
        );

    if (!execution) {
        return;
    }

    const stage =
        execution.stages[stageIndex];

    stage.status = "SUCCESS";

    stage.finishedAt =
        new Date();

    stage.duration =
        stage.finishedAt -
        stage.startedAt;

    execution.logs.push({
        level: "SUCCESS",
        message: `${stage.name} completed successfully.`,
    });

    await execution.save();

    executeNextStage(
        executionId,
        stageIndex + 1
    );
}