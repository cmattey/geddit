import confetti from 'canvas-confetti'

const checkSpecialGoal = (goalObj) => {

  if(goalObj.title.toLowerCase().includes("birthday") || goalObj.description.toLowerCase().includes("birthday")){
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

export default { checkSpecialGoal }
