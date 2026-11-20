/**
 * Keypoints (joints / landmarks) for hand, pose and face recognition.
 * HUSKYLENS 2 firmware 1.4.2+ sends them as "algorithm private data" after the name/content.
 * The order is the same as the Arduino library DFRobot_HuskylensV2 v1.4.2.
 * A block returns -1 when the target or the keypoint is not available.
 */
namespace huskylens2 {

    export enum KeypointAxis {
        //% block="x"
        X = 0,
        //% block="y"
        Y = 1,
    }

    export enum HandKeypoint {
        //% block="wrist"
        Wrist = 0,
        //% block="thumb base (CMC)"
        ThumbCmc = 1,
        //% block="thumb MCP"
        ThumbMcp = 2,
        //% block="thumb IP"
        ThumbIp = 3,
        //% block="thumb tip"
        ThumbTip = 4,
        //% block="index finger base (MCP)"
        IndexMcp = 5,
        //% block="index finger PIP"
        IndexPip = 6,
        //% block="index finger DIP"
        IndexDip = 7,
        //% block="index finger tip"
        IndexTip = 8,
        //% block="middle finger base (MCP)"
        MiddleMcp = 9,
        //% block="middle finger PIP"
        MiddlePip = 10,
        //% block="middle finger DIP"
        MiddleDip = 11,
        //% block="middle finger tip"
        MiddleTip = 12,
        //% block="ring finger base (MCP)"
        RingMcp = 13,
        //% block="ring finger PIP"
        RingPip = 14,
        //% block="ring finger DIP"
        RingDip = 15,
        //% block="ring finger tip"
        RingTip = 16,
        //% block="pinky base (MCP)"
        PinkyMcp = 17,
        //% block="pinky PIP"
        PinkyPip = 18,
        //% block="pinky DIP"
        PinkyDip = 19,
        //% block="pinky tip"
        PinkyTip = 20,
    }

    export enum PoseKeypoint {
        //% block="nose"
        Nose = 0,
        //% block="left eye"
        LeftEye = 1,
        //% block="right eye"
        RightEye = 2,
        //% block="left ear"
        LeftEar = 3,
        //% block="right ear"
        RightEar = 4,
        //% block="left shoulder"
        LeftShoulder = 5,
        //% block="right shoulder"
        RightShoulder = 6,
        //% block="left elbow"
        LeftElbow = 7,
        //% block="right elbow"
        RightElbow = 8,
        //% block="left wrist"
        LeftWrist = 9,
        //% block="right wrist"
        RightWrist = 10,
        //% block="left hip"
        LeftHip = 11,
        //% block="right hip"
        RightHip = 12,
        //% block="left knee"
        LeftKnee = 13,
        //% block="right knee"
        RightKnee = 14,
        //% block="left ankle"
        LeftAnkle = 15,
        //% block="right ankle"
        RightAnkle = 16,
    }

    export enum FaceKeypoint {
        //% block="left eye"
        LeftEye = 0,
        //% block="right eye"
        RightEye = 1,
        //% block="nose"
        Nose = 2,
        //% block="left mouth corner"
        LeftMouth = 3,
        //% block="right mouth corner"
        RightMouth = 4,
    }

    function keypointOf(r: ResultVariant, point: number, axis: number): number {
        if (!r) return -1;
        return (r as Result).keypoint(point, axis);
    }

    // ---------------------------------------------------------------- hand

    /**
     * Keypoint of the hand nearest to the screen center.
     * Call "get hand recognition result" first. Returns -1 if not available.
     */
    //% block="hand nearest to center keypoint %point %axis"
    //% weight=60
    //% subcategory="hand recognition"
    //% point.defl=huskylens2.HandKeypoint.IndexTip
    export function handKeypointNearestCenter(point: HandKeypoint, axis: KeypointAxis): number {
        return keypointOf(cachedCenterResultInternal(Algorithm.AlgorithmHandRecognition), point, axis);
    }

    /**
     * Keypoint of the No.N detected hand.
     * Call "get hand recognition result" first. Returns -1 if not available.
     */
    //% block="hand No.%index keypoint %point %axis"
    //% weight=59
    //% index.min=1 index.defl=1
    //% subcategory="hand recognition"
    //% point.defl=huskylens2.HandKeypoint.IndexTip
    export function handKeypoint(index: number, point: HandKeypoint, axis: KeypointAxis): number {
        return keypointOf(cachedResultByIndexInternal(Algorithm.AlgorithmHandRecognition, index - 1), point, axis);
    }

    // ---------------------------------------------------------------- pose

    /**
     * Keypoint of the person nearest to the screen center.
     * Call "get pose recognition result" first. Returns -1 if not available.
     */
    //% block="pose nearest to center keypoint %point %axis"
    //% weight=60
    //% subcategory="pose recognition"
    //% point.defl=huskylens2.PoseKeypoint.RightWrist
    export function poseKeypointNearestCenter(point: PoseKeypoint, axis: KeypointAxis): number {
        return keypointOf(cachedCenterResultInternal(Algorithm.AlgorithmPoseRecognition), point, axis);
    }

    /**
     * Keypoint of the No.N detected person.
     * Call "get pose recognition result" first. Returns -1 if not available.
     */
    //% block="pose No.%index keypoint %point %axis"
    //% weight=59
    //% index.min=1 index.defl=1
    //% subcategory="pose recognition"
    //% point.defl=huskylens2.PoseKeypoint.RightWrist
    export function poseKeypoint(index: number, point: PoseKeypoint, axis: KeypointAxis): number {
        return keypointOf(cachedResultByIndexInternal(Algorithm.AlgorithmPoseRecognition, index - 1), point, axis);
    }

    // ---------------------------------------------------------------- face

    /**
     * Keypoint of the face nearest to the screen center.
     * Call "get face recognition result" first. Returns -1 if not available.
     */
    //% block="face nearest to center keypoint %point %axis"
    //% weight=60
    //% subcategory="face recognition"
    //% point.defl=huskylens2.FaceKeypoint.Nose
    export function faceKeypointNearestCenter(point: FaceKeypoint, axis: KeypointAxis): number {
        return keypointOf(cachedCenterResultInternal(Algorithm.AlgorithmFaceRecognition), point, axis);
    }

    /**
     * Keypoint of the No.N detected face.
     * Call "get face recognition result" first. Returns -1 if not available.
     */
    //% block="face No.%index keypoint %point %axis"
    //% weight=59
    //% index.min=1 index.defl=1
    //% subcategory="face recognition"
    //% point.defl=huskylens2.FaceKeypoint.Nose
    export function faceKeypoint(index: number, point: FaceKeypoint, axis: KeypointAxis): number {
        return keypointOf(cachedResultByIndexInternal(Algorithm.AlgorithmFaceRecognition, index - 1), point, axis);
    }
}
