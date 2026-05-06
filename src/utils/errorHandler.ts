export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public severity: 'low' | 'medium' | 'high' = 'medium',
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const ErrorMessages = {
  // API Errors
  API_FAILURE: 'La requête a échoué. Veuillez vérifier votre connexion.',
  API_TIMEOUT: 'La requête a expiré. Veuillez réessayer.',
  API_UNAUTHORIZED: 'Vous n\'êtes pas autorisé à effectuer cette action.',
  API_FORBIDDEN: 'Accès refusé.',
  API_NOT_FOUND: 'La ressource demandée est introuvable.',

  // Auth Errors
  AUTH_FAILED: 'L\'authentification a échoué. Veuillez vérifier vos identifiants.',
  AUTH_EXPIRED: 'Votre session a expiré. Veuillez vous reconnecter.',
  TOKEN_INVALID: 'Token invalide.',

  // Validation Errors
  VALIDATION_FAILED: 'Veuillez vérifier vos données.',
  REQUIRED_FIELD: 'Ce champ est obligatoire.',
  INVALID_EMAIL: 'Adresse e-mail invalide.',
  INVALID_PASSWORD: 'Le mot de passe n\'est pas assez sécurisé.',

  // Generic Errors
  UNKNOWN_ERROR: 'Une erreur inattendue s\'est produite.',
  OPERATION_FAILED: 'L\'opération a échoué.',
} as const;

export interface ErrorLog {
  id: string;
  timestamp: Date;
  message: string;
  code: string;
  severity: string;
  context?: Record<string, unknown>;
  userAgent?: string;
  url?: string;
}

export class ErrorLogger {
  private static logs: ErrorLog[] = [];
  private static maxLogs = 100;

  static log(error: Error | AppError, context?: Record<string, unknown>): ErrorLog {
    const errorLog: ErrorLog = {
      id: `${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
      message: error.message,
      code: error instanceof AppError ? error.code : 'UNKNOWN_ERROR',
      severity: error instanceof AppError ? error.severity : 'medium',
      context,
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    this.logs.push(errorLog);

    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    if (process.env.NODE_ENV === 'development') {
      console.error('❌ Error logged:', errorLog);
    }

    return errorLog;
  }

  static getLogs(): ErrorLog[] {
    return [...this.logs];
  }

  static clearLogs(): void {
    this.logs = [];
  }

  static exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }
}

export function handleApiError(status: number, message?: string): AppError {
  const errorMap: Record<number, [string, 'low' | 'medium' | 'high']> = {
    401: [ErrorMessages.API_UNAUTHORIZED, 'high'],
    403: [ErrorMessages.API_FORBIDDEN, 'high'],
    404: [ErrorMessages.API_NOT_FOUND, 'low'],
    408: [ErrorMessages.API_TIMEOUT, 'medium'],
    500: [ErrorMessages.API_FAILURE, 'high'],
  };

  const [msg, severity] = errorMap[status] || [
    message || ErrorMessages.UNKNOWN_ERROR,
    'medium',
  ];
  return new AppError(msg, `API_${status}`, severity);
}
