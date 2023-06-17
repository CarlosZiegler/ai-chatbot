import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export function AlertAuth() {
  return (
    <Alert variant="destructive" className="mt-5 max-w-sm self-center">
      <AlertTitle>Auth Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  )
}
