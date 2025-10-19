
export interface MovieReminderInfo {
  shouldSendReminder: boolean;
  releaseDate: Date;
  daysUntilRelease: number;
  isToday: boolean;
}


export function checkMovieReminder(releaseDateString: string): MovieReminderInfo {
  const today = new Date();
  
  let releaseDate: Date;
  if (releaseDateString.includes('-') && releaseDateString.length === 10) {
   
    const [year, month, day] = releaseDateString.split('-').map(Number);
    releaseDate = new Date(year, month - 1, day); 
  } else {
    releaseDate = new Date(releaseDateString);
  }
  
  const todayStr = today.toLocaleDateString('pt-BR');
  const releaseDateStr = releaseDate.toLocaleDateString('pt-BR');
  
  const todayLocal = new Date(todayStr.split('/').reverse().join('-'));
  const releaseDateLocal = new Date(releaseDateStr.split('/').reverse().join('-'));
  
  const timeDiff = releaseDateLocal.getTime() - todayLocal.getTime();
  const daysUntilRelease = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  return {
    shouldSendReminder: daysUntilRelease >= 0, 
    releaseDate: releaseDateLocal,
    daysUntilRelease,
    isToday: daysUntilRelease === 0,
  };
}


export function shouldSendReminderToday(releaseDateString: string): boolean {
  const reminderInfo = checkMovieReminder(releaseDateString);
  return reminderInfo.isToday;
}


export function isFutureRelease(releaseDateString: string): boolean {
  const reminderInfo = checkMovieReminder(releaseDateString);
  return reminderInfo.shouldSendReminder;
}


export function formatDateToPortuguese(date: Date): string {
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}


export function calculateReminderDelay(releaseDateString: string): number {
  const reminderInfo = checkMovieReminder(releaseDateString);
  
  if (!reminderInfo.shouldSendReminder) {
    return 0; 
  }
  
  if (reminderInfo.isToday) {
    return 0;
  }
  
  const now = new Date();
  let releaseDate: Date;
  
  if (releaseDateString.includes('-') && releaseDateString.length === 10) {
    const [year, month, day] = releaseDateString.split('-').map(Number);
    releaseDate = new Date(year, month - 1, day);
  } else {
    releaseDate = new Date(releaseDateString);
  }
  
  releaseDate.setHours(9, 0, 0, 0);
  
  return releaseDate.getTime() - now.getTime();
}
