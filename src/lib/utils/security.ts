// CSRF Protection
export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export function validateCSRFToken(token: string, storedToken: string): boolean {
  if (!token || !storedToken) return false;
  return token === storedToken;
}

// Content Security Policy
export const CSP_DIRECTIVES = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", 'data:', 'https:'],
  'font-src': ["'self'"],
  'connect-src': ["'self'"],
  'media-src': ["'self'"],
  'object-src': ["'none'"],
  'child-src': ["'self'"],
  'worker-src': ["'self'"],
  'frame-ancestors': ["'none'"],
  'form-action': ["'self'"],
  'base-uri': ["'self'"],
  'manifest-src': ["'self'"],
};

export function generateCSPHeader(): string {
  return Object.entries(CSP_DIRECTIVES)
    .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
    .join('; ');
}

// Input sanitization
export function sanitizeHTML(input: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  
  return input.replace(/[&<>"'/]/g, (s) => map[s]);
}

// SQL injection prevention helpers
export function escapeSQLString(input: string): string {
  return input.replace(/'/g, "''");
}

// Rate limiting helpers
export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  keyGenerator?: (req: Request) => string;
}

export class RateLimiter {
  private requests = new Map<string, number[]>();
  
  constructor(private config: RateLimitConfig) {}
  
  isAllowed(key: string): boolean {
    const now = Date.now();
    const windowStart = now - this.config.windowMs;
    
    // Get existing requests for this key
    const keyRequests = this.requests.get(key) || [];
    
    // Filter out old requests
    const recentRequests = keyRequests.filter(time => time > windowStart);
    
    // Check if under limit
    if (recentRequests.length >= this.config.maxRequests) {
      return false;
    }
    
    // Add current request
    recentRequests.push(now);
    this.requests.set(key, recentRequests);
    
    return true;
  }
  
  cleanup(): void {
    const now = Date.now();
    for (const [key, requests] of this.requests.entries()) {
      const recentRequests = requests.filter(time => time > now - this.config.windowMs);
      if (recentRequests.length === 0) {
        this.requests.delete(key);
      } else {
        this.requests.set(key, recentRequests);
      }
    }
  }
}

// Audit logging
export interface AuditLogEntry {
  userId?: string;
  action: string;
  resource: string;
  resourceId?: string;
  metadata?: Record<string, any>;
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
}

export class AuditLogger {
  private logs: AuditLogEntry[] = [];
  
  log(entry: Omit<AuditLogEntry, 'timestamp'>): void {
    this.logs.push({
      ...entry,
      timestamp: new Date(),
    });
    
    // In production, send to logging service
    if (process.env.NODE_ENV === 'production') {
      this.sendToLoggingService(entry);
    }
  }
  
  private async sendToLoggingService(entry: Omit<AuditLogEntry, 'timestamp'>): Promise<void> {
    try {
      // Send to your logging service (e.g., Sentry, LogRocket, etc.)
      console.log('Audit log:', entry);
    } catch (error) {
      console.error('Failed to send audit log:', error);
    }
  }
  
  getLogs(): AuditLogEntry[] {
    return [...this.logs];
  }
}

export const auditLogger = new AuditLogger();

// Session security
export function generateSecureSessionId(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export function isSecureContext(): boolean {
  return typeof window !== 'undefined' && window.isSecureContext;
}

// Password utilities
export function generateSecurePassword(length: number = 16): string {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  
  return Array.from(array, byte => charset[byte % charset.length]).join('');
}

export function checkPasswordStrength(password: string): {
  score: number;
  feedback: string[];
} {
  const feedback: string[] = [];
  let score = 0;
  
  if (password.length >= 8) score += 1;
  else feedback.push('Use at least 8 characters');
  
  if (/[a-z]/.test(password)) score += 1;
  else feedback.push('Include lowercase letters');
  
  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push('Include uppercase letters');
  
  if (/\d/.test(password)) score += 1;
  else feedback.push('Include numbers');
  
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
  else feedback.push('Include special characters');
  
  if (password.length >= 12) score += 1;
  
  return { score, feedback };
}