export const checkScoreToken = (score: number) => {
  if (score < 30) {
    return {
      text: 'STRONG BEARISH',
      color: '#F04D1A',
      scoreColor: '#D92D20',
      backgroundColor: 'rgba(237, 203, 85, 0.10)',
    }
  }
  if (score >= 30 && score < 50) {
    return {
      text: 'BEARISH',
      color: '#FBA94B',
      scoreColor: '#FBA94B',
      backgroundColor: 'rgba(251, 169, 75, 0.10)',
    }
  }
  if (score >= 50 && score < 70) {
    return {
      text: 'Neutral',
      color: '#BDBDBD',
      scoreColor: '#BDBDBD',
      backgroundColor: 'rgba(189, 189, 189, 0.10)',
    }
  }
  if (score >= 70 && score < 85) {
    return {
      text: 'BULLISH',
      color: '#32AE60',
      scoreColor: '#32AE60',
      backgroundColor: 'rgba(50, 174, 96, 0.10)',
    }
  }
  if (score >= 85 && score < 100) {
    return {
      text: 'STRONG BULLISH',
      color: '#15FFAB',
      scoreColor: '#15FFAB',
      backgroundColor: 'rgba(21, 255, 171, 0.10)',
    }
  }
  return {
    text: '-',
    color: '',
    scoreColor: '',
    backgroundColor: '',
  }
}
