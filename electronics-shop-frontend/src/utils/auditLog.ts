/**
 * Audit Log Utility
 * Tracks all critical actions (transactions, edits, refunds, etc.)
 */

export type AuditAction = 'transaction_created' | 'transaction_edited' | 'transaction_refunded' | 'transaction_cancelled';

export interface AuditEntry {
  id: string;
  timestamp: string;
  action: AuditAction;
  userId?: string;
  userName?: string;
  targetId: string;
  targetType: 'transaction' | 'order' | 'product';
  changes?: Record<string, any>;
  notes?: string;
}

const AUDIT_LOG_KEY = 'admin_audit_log';

export const logAuditEntry = (
  action: AuditAction,
  targetId: string,
  targetType: 'transaction' | 'order' | 'product' = 'transaction',
  options?: {
    userId?: string;
    userName?: string;
    changes?: Record<string, any>;
    notes?: string;
  }
): void => {
  try {
    const entry: AuditEntry = {
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action,
      targetId,
      targetType,
      userId: options?.userId,
      userName: options?.userName,
      changes: options?.changes,
      notes: options?.notes,
    };

    const prev = localStorage.getItem(AUDIT_LOG_KEY);
    const log: AuditEntry[] = prev ? JSON.parse(prev) : [];
    log.unshift(entry);

    // Keep last 500 entries
    if (log.length > 500) log.pop();

    localStorage.setItem(AUDIT_LOG_KEY, JSON.stringify(log));
  } catch (err) {
    console.error('Failed to log audit entry:', err);
  }
};

export const getAuditLog = (): AuditEntry[] => {
  try {
    const prev = localStorage.getItem(AUDIT_LOG_KEY);
    return prev ? JSON.parse(prev) : [];
  } catch (err) {
    console.error('Failed to retrieve audit log:', err);
    return [];
  }
};

export const clearAuditLog = (): void => {
  try {
    localStorage.removeItem(AUDIT_LOG_KEY);
  } catch (err) {
    console.error('Failed to clear audit log:', err);
  }
};
