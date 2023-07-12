// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

library SVG {

    function load(
        string memory rgb,
        uint8[] memory speeds
    ) public pure returns (string memory) {
        return string(abi.encodePacked(
            '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">',
            '<defs>',
            '<radialGradient id="planetGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">',
            '<stop offset="0%" style="stop-color: rbg(',rgb,');stop-opacity:1" />',
            '<stop offset="100%" style="stop-color:#666666;stop-opacity:1" />',
            '</radialGradient>',
            '<radialGradient id="moon1Gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">',
            '<stop offset="0%" style="stop-color:#ffcc00;stop-opacity:1" />',
            '<stop offset="100%" style="stop-color:#ff9900;stop-opacity:1" />',
            '</radialGradient>',
            '<radialGradient id="moon2Gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">',
            '<stop offset="0%" style="stop-color:#ff00ff;stop-opacity:1" />',
            '<stop offset="100%" style="stop-color:#9900ff;stop-opacity:1" />',
            '</radialGradient>',
            '<radialGradient id="moon3Gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">',
            '<stop offset="0%" style="stop-color:#00ff00;stop-opacity:1" />',
            '<stop offset="100%" style="stop-color:#00cc00;stop-opacity:1" />',
            '</radialGradient>',
            '<filter id="shadowFilter" x="-30%" y="-30%" width="160%" height="160%">',
            '<feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#000000" flood-opacity="0.5" />',
            '</filter>',
            '<filter id="craterFilter">',
            '<feOffset dx="1" dy="1" in="SourceAlpha" result="offset" />',
            '<feGaussianBlur in="offset" stdDeviation="1" result="blur" />',
            '<feSpecularLighting in="blur" surfaceScale="2" specularConstant="0.75" specularExponent="20" lighting-color="#999999" result="specular">',
            '<fePointLight x="-5000" y="-10000" z="20000" />',
            '</feSpecularLighting>',
            '<feComposite in="specular" in2="SourceAlpha" operator="in" result="composite" />',
            '<feComposite in="SourceGraphic" in2="composite" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint" />',
            '</filter>',
            '</defs>',
            '<rect width="100%" height="100%" fill="#000000" />',
            '<g filter="url(#shadowFilter)">',
            '<circle cx="30" cy="20" r="0.5" fill="#ffffff" />',
            '<circle cx="230" cy="50" r="0.8" fill="#ff9900" />',
            '<circle cx="120" cy="80" r="1.2" fill="#ffcc00" />',
            '<circle cx="200" cy="50" r="0.7" fill="#ffffff" />',
            '<circle cx="230" cy="70" r="1.0" fill="#ff9900" />',
            '<circle cx="250" cy="25" r="0.9" fill="#ffcc00" />',
            '<circle cx="15" cy="200" r="0.5" fill="#ffffff" />',
            '<circle cx="25" cy="230" r="0.8" fill="#ff9900" />',
            '<circle cx="75" cy="190" r="1.0" fill="#ffcc00" />',
            '<circle cx="125" cy="230" r="0.7" fill="#ffffff" />',
            '</g>',
            '<circle cx="150" cy="150" r="100" fill="url(#planetGradient)" filter="url(#shadowFilter)"',
            '<g transform="rotate(0 150 150)">',
            '<circle cx="260" cy="70" r="10" fill="url(#moon1Gradient)" filter="url(#shadowFilter)">',
            '<animateTransform attributeName="transform" type="rotate" from="0 150 150" to="360 150 150" dur="',speeds[0],'s" repeatCount="indefinite" />',
            '<animateMotion dur="8s" repeatCount="indefinite">',
            '<mpath href="#moonPath1" />',
            '</animateMotion>',
            '</circle>',
            '<circle cx="270" cy="220" r="15" fill="url(#moon2Gradient)" filter="url(#shadowFilter)">',
            '<animateTransform attributeName="transform" type="rotate" from="0 150 150" to="360 150 150" dur="',speeds[1],'s" repeatCount="indefinite" />',
            '<animateMotion dur="12s" repeatCount="indefinite">',
            '<mpath href="#moonPath2" />',
            '</animateMotion>',
            '</circle>',
            '<circle cx="235" cy="210" r="12" fill="url(#moon3Gradient)" filter="url(#shadowFilter)">',
            '<animateTransform attributeName="transform" type="rotate" from="0 150 150" to="360 150 150" dur="',speeds[2],'s" repeatCount="indefinite" />',
            '<animateMotion dur="10s" repeatCount="indefinite">',
            '<mpath href="#moonPath3" />',
            '</animateMotion>',
            '</circle>',
            '</g>',
            '<circle id="moonPath1" cx="150" cy="150" r="90" fill="none" />',
            '<circle id="moonPath2" cx="150" cy="150" r="110" fill="none" />',
            '<circle id="moonPath3" cx="150" cy="150" r="130" fill="none" />',
            '<circle cx="150" cy="150" r="60" fill="rgba(0, 0, 0, 0.2)" filter="url(#shadowFilter)" />',
            '<circle cx="100" cy="120" r="7" fill="#888858" filter="url(#craterFilter)" />',
            '<circle cx="170" cy="180" r="10" fill="#878888" filter="url(#craterFilter)" />',
            '<circle cx="130" cy="240" r="8" fill="#888858" filter="url(#craterFilter)" />',
            '<circle cx="70" cy="190" r="9" fill="#878888" filter="url(#craterFilter)" />',
            '</svg>'
        ));
    }
}
