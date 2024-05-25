import { GOAL_MAX_NAME_LENGTH, GOAL_MIN_NAME_LENGTH } from "./constants";
// TODO: Discuss with your team and implement the following validations:
// 1. timePeriodStart should be less than now?

export const validateGoalForm = (name, owner, timePeriodStart, timePeriodEnd) => {
  const timeNow = new Date().getTime();

  if (!name) {
    throw new Error('Name is required');
  }

  if (name.length < GOAL_MIN_NAME_LENGTH) {
    throw new Error(`Name must be at least ${GOAL_MIN_NAME_LENGTH} characters`);
  }

  if (name.length > GOAL_MAX_NAME_LENGTH) {
    throw new Error(`Name must be at most ${GOAL_MAX_NAME_LENGTH} characters`);
  }

  if (!owner) {
    throw new Error('Owner is required');
  }

  if (!timePeriodStart) {
    throw new Error('Start date is required');
  }

  // if (timePeriodStart > timeNow) {
  //   throw new Error('Start date must be today or before');
  // }

  if (!timePeriodEnd) {
    throw new Error('End date is required');
  }

  if (timePeriodEnd < timeNow) {
    throw new Error('End date must be today or after');
  }

  if (timePeriodStart > timePeriodEnd) {
    throw new Error('Start date must be before end date');
  }
}

export const goalCreateValidation = (name, owner, timePeriodStart, timePeriodEnd) => {
  const timeNow = new Date().getTime();

  if (!name) {
    throw new Error('Name is required')
  }

  if (name.length < GOAL_MIN_NAME_LENGTH) {
    throw new Error(`Name must be at least ${GOAL_MIN_NAME_LENGTH} characters`)
  }

  if (name.length > GOAL_MAX_NAME_LENGTH) {
    throw new Error(`Name must be at most ${GOAL_MAX_NAME_LENGTH} characters`)
  }

  if (!owner) {
    throw new Error('Owner is required')
  }

  if (!timePeriodStart) {
    throw new Error('Start date is required')
  }

  // if (timePeriodStart > timeNow) {
  //   throw new Error('Start date must be today or before')
  // }

  if (!timePeriodEnd) {
    throw new Error('End date is required')
  }

  if (timePeriodEnd < timeNow) {
    throw new Error('End date must be today or after')
  }

  if (timePeriodStart > timePeriodEnd) {
    throw new Error('Start date must be before end date')
  }
};

export const goalUpdateValidation = (name, owner, timePeriodStart, timePeriodEnd, status, progress) => {
  const timeNow = new Date().getTime();

  if (!name) {
    throw new Error('Name is required');
  }

  if (name.length < GOAL_MIN_NAME_LENGTH) {
    throw new Error(`Name must be at least ${GOAL_MIN_NAME_LENGTH} characters`);
  }

  if (name.length > GOAL_MAX_NAME_LENGTH) {
    throw new Error(`Name must be at most ${GOAL_MAX_NAME_LENGTH} characters`);
  }

  if (!owner) {
    throw new Error('Owner is required');
  }

  if (!timePeriodStart) {
    throw new Error('Start date is required');
  }

  // if (timePeriodStart > timeNow) {
  //   throw new Error('Start date must be today or before');
  // }

  if (!timePeriodEnd) {
    throw new Error('End date is required');
  }

  if (timePeriodEnd < timeNow) {
    throw new Error('End date must be today or after');
  }

  if (timePeriodStart > timePeriodEnd) {
    throw new Error('Start date must be before end date');
  }

  if (!status) {
    throw new Error('Status is required');
  }

  if (!progress) {
    throw new Error('Progress is required');
  }
};