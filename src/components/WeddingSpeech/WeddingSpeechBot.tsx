import { useState } from "react";
import { Flex, Text, Button } from "@radix-ui/themes";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { VscError } from "react-icons/vsc";
import { generateWeddingSpeech } from "./weddingspeechdata.ts";
import { WeddingSpeechFormInput, WeddingSpeechRequest } from "./types.tsx";

const WeddingSpeechBot = () => {
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Something went wrong");

  const { register, handleSubmit, watch, reset } =
    useForm<WeddingSpeechFormInput>();

  const targetPersonValue = watch("targetPerson");
  const targetPersonPartnerValue = watch("targetPersonPartner");

  const onFormSubmit: SubmitHandler<WeddingSpeechFormInput> = async (data) => {
    setIsProcessing(true);

    const weddingSpeechRequest: WeddingSpeechRequest = {
      speakerName: data.speakerName,
      isBestMan: data.isBestMan === "yes" ? true : false,
      isMaidOfHonor: data.isMaidOfHonor === "yes" ? true : false,
      targetPerson: data.targetPerson,
      targetRelation: data.targetRelation,
      targetPersonPronoun: data.targetPersonPronoun,
      targetPersonChars: data.targetPersonChars.split(",", 3),
      targetPersonPartner: data.targetPersonPartner,
      targetPersonPartnerPronoun: data.targetPersonPartnerPronoun,
      targetPersonPartnerChars: data.targetPersonPartnerChars.split(",", 3),
      parentMemory: data.parentMemory,
      siblingMemory: data.siblingMemory,
      firstMeetMemory: data.firstMeetMemory,
      memory: data.memory,
      emotion: data.emotion,
    };

    const response = await generateWeddingSpeech(weddingSpeechRequest);

    setIsProcessing(false);
    if (response.id) {
      navigate("/wedding-speech-generator/" + response.id);
    } else {
      setErrorMessage(response.statusText);
      setIsError(true);
    }

    reset();
  };

  const isParent = (relation: string) => {
    return (
      relation === "father" ||
      relation === "mother" ||
      relation === "step-father" ||
      relation === "step-mother"
    );
  };

  const isSibling = (relation: string) => {
    return (
      relation === "younger-brother" ||
      relation === "younger-sister" ||
      relation === "elder-brother" ||
      relation === "elder-sister" ||
      relation === "twin-brother" ||
      relation === "twin-sister"
    );
  };

  const isFriend = (relation: string) => {
    return relation === "friend";
  };

  return (
    <>
      <Flex p="5" className="polka" style={{ width: "100vw" }} justify="center">
        <Text size="7" align="center">
          Free AI Wedding Speech Generator
        </Text>
      </Flex>
      <Flex
        m="3"
        direction="column"
        justify="center"
        align="center"
        style={{ display: isProcessing ? "flex" : "none" }}
      >
        <AiOutlineLoading3Quarters
          className="rotate-center"
          style={{ width: "10vw", height: "10vh" }}
        />
        <Text mt="5" size="5">
          AI is doing its magic... Wait for few seconds...
        </Text>
      </Flex>
      <Flex
        m="3"
        direction="column"
        justify="center"
        align="center"
        style={{ display: isError ? "flex" : "none" }}
      >
        <VscError style={{ width: "10vw", height: "10vh" }} />
        <Text mt="5" size="5">
          {errorMessage}
        </Text>
      </Flex>
      <Flex
        m="2"
        direction="column"
        align="center"
        justify="center"
        style={{ display: isProcessing || isError ? "none" : "flex" }}
      >
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Flex m="5" direction="column" justify="center">
            <Text size="7"> What is your first Name? </Text>
            <input
              type="text"
              required
              placeholder="example: Gloria"
              {...register("speakerName")}
              style={{ width: "80vw", height: "6vh" }}
            />
          </Flex>
          <Flex m="5" direction="column" justify="center">
            <Text size="7"> Are you the Best Man</Text>
            <select
              {...register("isBestMan")}
              style={{ width: "80vw", height: "8vh" }}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </Flex>
          <Flex m="5" direction="column" justify="center">
            <Text size="7"> Are you Maid of Honor</Text>
            <select
              {...register("isMaidOfHonor")}
              style={{ width: "80vw", height: "8vh" }}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </Flex>
          <Flex m="5" direction="column" justify="center">
            <Text size="7"> This speech is for </Text>
            <input
              type="text"
              required
              placeholder="example: Phil [Name of the person asking you to give the speech]"
              {...register("targetPerson")}
              style={{ width: "80vw", height: "6vh" }}
            />
          </Flex>
          {targetPersonValue && (
            <Flex m="5" direction="column" justify="center">
              <Text size="7"> You are {targetPersonValue}'s </Text>
              <select
                {...register("targetRelation")}
                style={{ width: "80vw", height: "8vh" }}
              >
                <option value="father">Father</option>
                <option value="mother">Mother</option>
                <option value="step-father">Step-Father</option>
                <option value="step-mother">Step-Mother</option>
                <option value="younger-brother">Younger Brother</option>
                <option value="elder-brother">Elder Brother</option>
                <option value="twin-brother">Twin Brother</option>
                <option value="younger-sister">Younger Sister</option>
                <option value="elder-sister">Elder Sister</option>
                <option value="twin-sister">Twin Sister</option>
                <option value="friend">Friend</option>
              </select>
            </Flex>
          )}
          {targetPersonValue && (
            <Flex m="5" direction="column" justify="center">
              <Text size="7"> {targetPersonValue}'s pronoun </Text>
              <select
                {...register("targetPersonPronoun")}
                style={{ width: "80vw", height: "8vh" }}
              >
                <option value="he">He/Him</option>
                <option value="her">She/Her</option>
                <option value="They">They/Them</option>
              </select>
            </Flex>
          )}
          {targetPersonValue && (
            <Flex m="5" direction="column" justify="center">
              <Text size="7">
                {" "}
                What are three characteristics that describe {
                  targetPersonValue
                }{" "}
              </Text>
              <Text mt="1" mb="1" size="2">
                Use comma to separate words
              </Text>
              <input
                type="text"
                required
                placeholder="example: Optimistic, Kind, Calm"
                {...register("targetPersonChars")}
                style={{ width: "80vw", height: "6vh" }}
              />
            </Flex>
          )}
          {targetPersonValue && (
            <Flex m="5" direction="column" justify="center">
              <Text size="7">Who is {targetPersonValue} marrying?</Text>
              <input
                type="text"
                required
                placeholder="example: Claire"
                {...register("targetPersonPartner")}
                style={{ width: "80vw", height: "6vh" }}
              />
            </Flex>
          )}
          {targetPersonPartnerValue && (
            <Flex m="5" direction="column" justify="center">
              <Text size="7"> {targetPersonPartnerValue}'s pronoun </Text>
              <select
                {...register("targetPersonPartnerPronoun")}
                style={{ width: "80vw", height: "8vh" }}
              >
                <option value="he">He/Him</option>
                <option value="her">She/Her</option>
                <option value="They">They/Them</option>
              </select>
            </Flex>
          )}
          {targetPersonPartnerValue && (
            <Flex m="5" direction="column" justify="center">
              <Text size="7">
                What are three characteristics that describe{" "}
                {targetPersonPartnerValue} ?
              </Text>
              <Text mt="1" mb="1" size="2">
                Use comma to separate words
              </Text>
              <input
                type="text"
                required
                placeholder="example: Competitive, Organized, Responsible"
                {...register("targetPersonPartnerChars")}
                style={{ width: "80vw", height: "6vh" }}
              />
            </Flex>
          )}
          {targetPersonPartnerValue && isParent(watch("targetRelation")) && (
            <Flex m="5" direction="column" justify="center">
              <Text size="7">
                What it was like being {targetPersonValue}'s parent during their
                childhood?
              </Text>
              <input
                type="text"
                placeholder="example: Raising Phil was like teaching a fish to ride a bicycle - challenging, but always full of laughs."
                {...register("memory")}
                style={{ width: "80vw", height: "10vh" }}
              />
            </Flex>
          )}
          {targetPersonPartnerValue && isSibling(watch("targetRelation")) && (
            <Flex m="5" direction="column" justify="center">
              <Text size="7">
                What it was like growing up with {targetPersonValue} ?
              </Text>
              <input
                type="text"
                placeholder="example: Growing up with Phil was like having a personal stand-up comedian at home. There was never a dull moment"
                {...register("memory")}
                style={{ width: "80vw", height: "10vh" }}
              />
            </Flex>
          )}
          {targetPersonPartnerValue && isFriend(watch("targetRelation")) && (
            <Flex m="5" direction="column" justify="center">
              <Text size="7">
                How did you meet {targetPersonValue}? What were your initial
                thoughts about them?
              </Text>
              <input
                type="text"
                placeholder="example: I met Phil when dinosaurs roamed the Earth, or maybe it just feels that way. Our paths crossed, and I thought, 'This guy is a walking sitcom!' His enthusiasm for life was infectious"
                {...register("memory")}
                style={{ width: "80vw", height: "10vh" }}
              />
            </Flex>
          )}
          {targetPersonPartnerValue && (
            <Flex m="5" direction="column" justify="center">
              <Text size="7">
                {" "}
                Any specific memory that you would like to add to the speech?{" "}
              </Text>
              <input
                type="text"
                placeholder="example: Remember that time Phil tried to impress a date by attempting a magic trick involving spaghetti? Yep, it was messy, confusing, and absolutely hilarious"
                {...register("memory")}
                style={{ width: "80vw", height: "10vh" }}
              />
            </Flex>
          )}
          {targetPersonPartnerValue && (
            <Flex m="5" direction="column" justify="center">
              <Text size="7">
                What emotion do you want to express in your speech?
              </Text>
              <select
                {...register("emotion")}
                style={{ width: "80vw", height: "8vh" }}
              >
                <option value="humor">Humor</option>
                <option value="emotional">Emotional</option>
                <option value="inspirational">Inspirational</option>
                <option value="hope">Hope</option>
                <option value="gratitude">Gratitude</option>
              </select>
            </Flex>
          )}
          <Flex m="5" direction="column" justify="center">
            <Button size="4">Generate</Button>
          </Flex>
        </form>
      </Flex>
    </>
  );
};

export default WeddingSpeechBot;
