

const platformMathods = {
    "PC": "PC",
"Nintendo": "Nintendo",
"PS4": "PS4",
"PS5": "PS5",
"XBOX":"XBOX",
}

exports.getPlatformWay = (platformWayData) => {
    const platformWay = Object.keys(platformMathods).map(key => ({ 
        value: key, 
        label: platformMathods[key],
        isSelected: platformWayData == key,
    }));

    return platformWay;

}

