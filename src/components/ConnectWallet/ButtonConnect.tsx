import { useState } from 'react'
import { useConnect, useAccount } from 'wagmi'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack
} from '@chakra-ui/react'
import { WalletSelector } from './WalletSelector'

export const ButtonConnect = () => {
  const [{ data: connection, loading: connectionLoading }] = useConnect()
  const [{ data: account, loading: accountLoading }, disconnect] = useAccount()
  const [modalActive, setModalActive] = useState(false)
  const isLoading = connectionLoading || accountLoading
  const isDisconnected = !connection?.connected || !account?.address
  const isConnected = connection?.connected && account?.address

  return (
    <VStack spacing={5}>
      {/* Disconnect */}
      {isConnected && (
        <Button
          fontSize="24px"
          py="27px"
          px="24px"
          colorScheme="blackAlpha"
          className="px-5 py-2"
          onClick={disconnect}
        >
          Disconnect
        </Button>
      )}

      {!isConnected && (
        <Button
          disabled={isLoading}
          className="px-5 py-2 bg-black text-white"
          onClick={() => setModalActive(true)}
          fontSize="24px"
          py="27px"
          px="24px"
          colorScheme="blackAlpha"
          style={{
            boxShadow: '0 0 0 8px rgba(255, 213, 0, 0.2)',
            borderRadius: '12px'
          }}
        >
          {isLoading ? 'Loading...' : 'Connect'}
        </Button>
      )}

      <Modal
        isOpen={modalActive}
        onClose={() => setModalActive(false)}
        isCentered
      >
        <ModalOverlay />
        <ModalContent textColor="black">
          <ModalHeader as="div">Connect Wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <WalletSelector
              onConnect={(isConnected) => setModalActive(!isConnected)}
            />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  )
}
