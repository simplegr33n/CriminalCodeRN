'use strict';
import Tts from 'react-native-tts';


class TextSpeechUtil  {

    readText(textToRead) {
        console.log("TextSpeechUtil TextToRead: " + textToRead);
    
        // Set language (ideally not done every time in a real app)
        Tts.setDefaultLanguage('en-US');
    
        // Check TTS init status
        // Stop any previously playing TTS
        // Play the thing
        Tts.getInitStatus().then(() => {
            console.log("TTS Initialized");
            Tts.stop();
            Tts.speak(textToRead);
        }, (err) => {
            if (err.code === 'no_engine') {
                Tts.requestInstallEngine();
            } else {
                console.log("TTS ERROR: " + err.code + ", " + err.message);
            }
        }).catch(function (err) {
            console.log('There has been a problem with your fetch operation: ' + err.message);
        });
    
    }
}




module.exports = new TextSpeechUtil();