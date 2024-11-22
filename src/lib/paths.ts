const paths = {
  home () {
    return '/';
  }
  , trainingPlanShow (trainingPlanId: string) {
    return `/trainings/${trainingPlanId}`;
  }
};

export default paths;