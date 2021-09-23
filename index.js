// The Puzzel is from https://www.creativeescaperooms.com/
// Called the Safecracker 50
// The puzzel is a series of wheels, 4 of the weels have geared teeth (outer) 
// The inner rings are all solid
// The bellow arrays for the gear teeth and solid wheels

wheel_0o = [19, null,  8, null, 17, null,  6, null,  6, null,  8, null,  8, null, 16, null];
wheel_1i = [ 4,   20,  4,   14,  4,    5,  1,   14, 10,   17, 10,    5,  6,   18,  8,   17];
wheel_1o = [11, null,  8, null, 12, null, 11, null,  3, null,  8, null, 10, null, 14, null];
wheel_2i = [ 0,   22, 19,   10,  0,    5, 20,    8, 19,   10, 15,   20, 12,   20, 13,   13];
wheel_2o = [10, null, 11, null, 10, null,  0, null, 11, null,  8, null,  8, null,  8, null];
wheel_3i = [10,   12, 22,    0,  5,    8,  5,    1, 24,    8, 10,   20,  7,   20, 12,    1];
wheel_3o = [ 8, null,  8, null,  9, null,  6, null, 10, null,  8, null, 10, null,  9, null];
wheel_4i = [13,   11, 13,   10, 18,   10, 10,   10, 10,   15,  7,   19, 18,    2,  9,   27];
wheel_4o = [ 0,   16,  8,    4, 15,    7, 10,    1, 10,    4,  5,    3, 15,   16,  4,    7];


// Wheel 0 is "fixed" so we always start at 0
// all other weels should go from 0 to 15
w1m = 15;
w2m = 15;
w3m = 15;
w4m = 15;
// initialize attempt count
attempts = 0;
// loop through the remaining wheels
for (let w1 = 0; w1 < w1m; w1++) {
    for (let w2 = 0; w2 < w2m; w2++) {
        for (let w3 = 0; w3 < w3m; w3++) {
            for (let w4 = 0; w4 < w4m; w4++) {
                // set the wheel postion for each attempt
                wheelIndexs = [0, w1, w2, w3, w4];
                targetRays = createRays(wheelIndexs);
                // console.log("WheelPositions 0",w1, w2, w3, w4, "\n", targetRays);
                attempts++;
                if (checkRays(targetRays)) {
                    console.log(
                        "Winning Soltion on attempt", attempts, " \n",
                        targetRays, "\n",
                    );
                }
            }
        }
    }
}
console.log(attempts, " combinations checked");

// wheelIndexs = [0, 14, 14, 14, 14]
// targetRays = createRays(wheelIndexs);
// console.log(targetRays);


function checkRays(raysToCheck) {
    for (let curRay = 0; curRay < rays.length; curRay++) {
        const xray = rays[curRay];
        if (!checkRay(xray)) {
            return false;
        }
    }
    return true
}

function checkRay(ray) {
    // sum up the row and check if it equals 50
    var totalAmount = ray.reduce(function (sum, cog) {
        return sum + cog;
    }, 0)
    return totalAmount === 50;
}

function createRays(wheelIndexs) {
    // create an empty array to hold the ray arays
    rays = [];
    for (let currRay = 0; currRay < 16; currRay++) {
        // Get the number that will show in each ring based on the wheels starting index
        workingRay = [ 
                getWheel0numer(currRay, wheelIndexs), 
                getWheel1numer(currRay, wheelIndexs), 
                getWheel2numer(currRay, wheelIndexs), 
                getWheel3numer(currRay, wheelIndexs), 
                getWheel4numer(currRay, wheelIndexs)
            ];
        // console.log(workingRay)
        rays.push(workingRay);
    }
    return rays;
}

function getWheel0numer(ray, index) {
    w0t = wheelCorrect(index[0] + ray);
    w1t = wheelCorrect(index[1] + ray);
    if (wheel_0o[w0t] == null) {
        return wheel_1i[w1t]
    } else {
        return wheel_0o[w0t];
    }
}

function getWheel1numer(ray, index) {
    w1t = wheelCorrect(index[1] + ray);
    w2t = wheelCorrect(index[2] + ray);
    // console.log("wheel 1(", w1t, ", ", wheel_1o[w1t], ") wheel 2(", w2t, ", ", wheel_2i[w2t], ")");
    if (wheel_1o[w1t] == null) {
        return wheel_2i[w2t]
    } else {
        return wheel_1o[w1t];
    }
}

function getWheel2numer(ray, index) {
    w2t = wheelCorrect(index[2] + ray);
    w3t = wheelCorrect(index[3] + ray);
    if (wheel_2o[w2t] == null) {
        return wheel_3i[w3t]
    } else {
        return wheel_2o[w2t];
    }
}

function getWheel3numer(ray, index) {
    w3t = wheelCorrect(index[3] + ray);
    w4t = wheelCorrect(index[4] + ray);
    if (wheel_3o[w3t] == null) {
        return wheel_4i[w4t]
    } else {
        return wheel_3o[w3t];
    }
}

function getWheel4numer(ray, index) {
    w4t = wheelCorrect(index[4] + ray);
    if (w4t > wheel_4o.lenght-1) {
        w4t = 0;
    }
    return wheel_4o[w4t]

}

function wheelCorrect(wheelTarget) { 
    // if target is beyond the bounds find replace the target with Mod 16
    if (wheelTarget > 15) {
        wheelTarget = wheelTarget%16
    }
    return wheelTarget
}