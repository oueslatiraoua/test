import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

import { useDispatch } from "react-redux";
import { addPost, getPosts, updatePost } from "../slices/postSlice";

function PostModal({
  check,
  image,
  title,
  aboutTheService,
  task,
  aboutTheFreelancer,
  id,
}) {
  const dispatch = useDispatch();
  //Hook Form
  const { register, handleSubmit } = useForm();
  const [file, setFile] = useState({});
  const newPost = (data) => {
    //**********update  post
    check
      ? dispatch(updatePost({ info: { ...data, id }, file }))
      : //**********Add new post
        dispatch(addPost({ data, file }));
  };

  //**********Show and Hide
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <button onClick={onOpen}>
        {check ? (
          <i
            class="fas fa-user-edit"
            style={{
              display: "flex",
              fontSize: "18px",

              color: "DarkCyan",
              cursor: "pointer",
            }}
          >
            {" "}
            <span style={{ marginTop: "7px", fontSize: "11px" }}>
              {" "}
              Edit
            </span>{" "}
          </i>
        ) : (
          <i
            class="far fa-plus-square"
            style={{
              fontSize: "20px",
              color: "white",
              padding: "10px",
              display: "inline",
              borderRadius: "10px",
              border: "1px solid",
              margin: "150px",
            }}
          >
            <span
              style={{
                fontSize: "20px",
                color: "burlywood",
                padding: "10px",
                display: "inline",
                fontFamily: "initial",
              }}
            >
              {"add new post"}
            </span>
          </i>
        )}
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel htmlFor="file">Image</FormLabel>
              <Input type="file" onChange={(e) => setFile(e.target.files[0])} />

              <FormLabel htmlFor="title">title</FormLabel>
              <Input
                id="title"
                placeholder="title"
                {...register("title", { value: title })}
              />
              <FormLabel htmlFor="task">Task</FormLabel>
              <Input
                id="task"
                placeholder="task"
                {...register("task", { value: task })}
              />
              <FormLabel htmlFor="About the the service">
                About the the service
              </FormLabel>
              <Input
                id="About the the service"
                placeholder="About the the service"
                {...register("aboutTheService", {
                  value: aboutTheService,
                })}
              />
              <FormLabel htmlFor="About the the service">
                About the freelancer
              </FormLabel>
              <Input
                id="About the freelancer"
                placeholder="About the freelancer"
                {...register("aboutTheFreelancer", {
                  value: aboutTheFreelancer,
                })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleSubmit(newPost)}>
              {check ? "Edit" : "publish"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default PostModal;
