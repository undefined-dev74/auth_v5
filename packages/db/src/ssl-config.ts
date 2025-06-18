import * as fs from "node:fs";
import * as path from "node:path";

export interface SSLOptions {
  SSL_CA_PATH?: string;
  SSL_CERT_PATH?: string;
  SSL_KEY_PATH?: string;
  PGSSLMODE?: string;
}

export function createSSLConfig(options: SSLOptions) {
  const { SSL_CA_PATH, SSL_CERT_PATH, SSL_KEY_PATH, PGSSLMODE } = options;

  // No SSL required
  if (PGSSLMODE !== "require") {
    return false;
  }

  // SSL with client certificates
  if (SSL_CA_PATH && SSL_CERT_PATH && SSL_KEY_PATH) {
    try {
      return {
        rejectUnauthorized: true,
        ca: fs.readFileSync(path.resolve(SSL_CA_PATH)),
        cert: fs.readFileSync(path.resolve(SSL_CERT_PATH)),
        key: fs.readFileSync(path.resolve(SSL_KEY_PATH)),
        // Bypass hostname verification for IP address connections
        checkServerIdentity: () => undefined,
      };
    } catch (error) {
      console.warn("Warning: Error reading SSL certificates:", error);
      // Fallback to basic SSL
      return {
        rejectUnauthorized: false,
        checkServerIdentity: () => undefined,
      };
    }
  }

  // Basic SSL (required but no client certificates)
  return {
    rejectUnauthorized: false,
    checkServerIdentity: () => undefined,
  };
}
