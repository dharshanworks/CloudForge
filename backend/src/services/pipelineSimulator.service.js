import PipelineExecution from "../models/pipelineExecution.model.js";

const STAGE_DELAY = 3000;

export async function simulatePipelineExecution(
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

  await execution.save();

  for (
    let index = 0;
    index < execution.stages.length;
    index++
  ) {
    const stage =
      execution.stages[index];

    stage.status = "RUNNING";

    execution.logs.push({
      timestamp: new Date(),
      message: `${stage.name} started`,
      level: "INFO",
    });

    await execution.save();

    await wait(STAGE_DELAY);

    stage.status = "SUCCESS";

    execution.logs.push({
      timestamp: new Date(),
      message: `${stage.name} completed successfully`,
      level: "SUCCESS",
    });

    await execution.save();
  }

  execution.status = "SUCCESS";

  execution.completedAt =
    new Date();

  execution.duration =
    Math.floor(
      (execution.completedAt -
        execution.startedAt) /
        1000
    );

  await execution.save();
}

function wait(milliseconds) {
  return new Promise((resolve) =>
    setTimeout(resolve, milliseconds)
  );
}