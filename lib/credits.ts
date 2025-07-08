interface CreditStore {
  [userId: string]: number;
}

const LOCAL_STORAGE_KEY = 'creditStore';

function loadCreditStore(): CreditStore {
  if (typeof window === 'undefined') return {};
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : {};
}

function saveCreditStore(store: CreditStore): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store));
}

let creditStore: CreditStore = loadCreditStore();

export function getCredits(userId: string): number {
  return creditStore[userId] || 0;
}

export function addCredits(userId: string, amount: number): number {
  const current = getCredits(userId);
  creditStore[userId] = current + amount;
  saveCreditStore(creditStore);
  return creditStore[userId];
}

export function deductCredits(userId: string, amount: number): boolean {
  const current = getCredits(userId);
  if (current >= amount) {
    creditStore[userId] = current - amount;
    saveCreditStore(creditStore);
    return true;
  }
  return false;
}

export function resetCredits(userId: string): void {
  creditStore[userId] = 0;
  saveCreditStore(creditStore);
}

export function initializeDemoCredits(): void {
  if (!creditStore['demo-user']) {
    creditStore['demo-user'] = 10;
    saveCreditStore(creditStore);
  }
}
