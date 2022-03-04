import * as React from 'react'
import { useConnect } from 'wagmi'
import { Button, VStack } from '@chakra-ui/react'

interface Props {
  onConnect: (connected: boolean) => void
}

export const WalletSelector = ({ onConnect }: Props) => {
  const [{ data: connection, error: connectionError }, connect] = useConnect()

  React.useEffect(() => {
    onConnect(!!connection?.connected)
  }, [connection?.connected, onConnect])

  return (
    <VStack spacing={4}>
      {connection.connectors.map(
        (connector) =>
          connector?.ready && (
            <Button
              isFullWidth
              padding={8}
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => connect(connector)}
            >
              {connector.name}
            </Button>
          )
      )}

      {connectionError && (
        <div>{connectionError?.message ?? 'Failed to connect'}</div>
      )}
    </VStack>
  )
}
