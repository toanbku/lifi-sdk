export interface ExtendedRequestInit extends RequestInit {
  retries?: number;
  agent?: any;
}
