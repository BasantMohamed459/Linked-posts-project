import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";

import { Button, useDisclosure } from "@heroui/react";

export default function PostBody({ body, image }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {body && <p>{body}</p>}
      {image && (
        <>
          <Button
            onPress={onOpen}
            variant="light"
            className="w-full h-full bg-white"
          >
            <img
              className=" object-cover mr-3"
              src={image}
              alt=""
              onPress={onOpen}
            />
          </Button>

          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalBody>
                    <img
                      className=" object-cover  w-full h-full"
                      src={image}
                      alt=""
                      onPress={onOpen}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
}
