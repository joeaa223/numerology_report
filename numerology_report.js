import { GoogleGenAI, Type } from "@google/genai";

import { createRequire } from "module"; //can be removed if "require" is not used

const require = createRequire(import.meta.url); // Can be removed if "require" is not used

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});
const language = "Mandarin"

const readline = require('readline'); // Node.js built-in module for reading input from the console, can be removed if "require" or "question" is not used
const util = require('util'); // Utility module for promisifying functions, can be removed if "require" or "question" is not used

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
}); // can be removed if "require" or "question" is not used

const question = util.promisify(rl.question).bind(rl); // can be removed if "require" or "question" is not used


async function getReport({personality, age, lifePath, isMaster, karmicDebtOrigin, birthday, challenges, personalYear}) {
        let opening = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        config: {
            thinkingConfig: {
                thinkingBudget: 0,
            },
            httpOptions: {
                timeout: 30*1000
            },
            maxOutputTokens: 4000,
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        reportTitle: { type: Type.STRING, description: "An evocative and empowering title for the report, e.g., 'A Guide to Nurturing Your Little Powerhouse'." },
                        chapter1_innerTeam: {
                            type: Type.OBJECT,
                            properties: {
                                title: { type: Type.STRING },
                                introduction: { type: Type.STRING, description: "A brief, compassionate introduction to the concept of the child's 'inner team' of archetypes." },
                                teamCaptain: {
                                    type: Type.OBJECT,
                                    properties: {
                                        archetype: { type: Type.STRING, description: "The name of the core archetype based on the lifePath.number (e.g., 'The Little Sage', 'The Powerhouse')" },
                                        description: { type: Type.STRING, description: "A detailed paragraph describing the core traits and motivations of the Team Captain archetype." },
                                        whatItLooksLike: { type: Type.STRING, description: "A paragraph of concrete, observable behaviors parents might see in their child that reflect this archetype." },
                                        theWhyBehindIt: { type: Type.STRING, description: "A paragraph explaining the underlying psychological or numerological reason for the archetype's behavior." }
                                    },
                                    required: ["archetype", "description", "whatItLooksLike", "theWhyBehindIt"],
                                    propertyOrdering: ["archetype", "description", "whatItLooksLike", "theWhyBehindIt"]
                                },
                                supportingCast: {
                                    type: Type.ARRAY,
                                    description: "Two supporting archetypes derived from the birthday number and challenges.main.",
                                    items: {
                                        type: Type.OBJECT,
                                        properties: {
                                            archetype: { type: Type.STRING,description: "The name of the supporting archetype (e.g., 'The Nurturer', 'The Innovator')" },
                                            description: { type: Type.STRING, description: "A brief description of the supporting archetype's traits and how they complement the Team Captain." },
                                            sourceNumber: { type: Type.STRING, description: "A string explaining where this archetype is derived from, e.g., 'from their Birthday Number 11'." }
                                        },
                                        required: ["archetype", "description", "sourceNumber"],
                                        propertyOrdering: ["archetype", "description", "sourceNumber"]
                                    }
                                },
                                coreDynamic: { type: Type.STRING, description: "A paragraph explaining the interplay between the Team Captain and the supporting cast, including potential conflicts and synergies." },
                                reflectionQuestions: {
                                    type: Type.ARRAY,
                                    description: "An array of 2-3 thought-provoking questions for the parent to reflect on regarding their child's inner team.",
                                    items: { type: Type.STRING }
                                },  
                                },
                            required: ["title", "introduction", "teamCaptain", "supportingCast", "coreDynamic", "reflectionQuestions"],
                            propertyOrdering: ["title", "introduction", "teamCaptain", "supportingCast", "coreDynamic", "reflectionQuestions"]
                            },
                        chapter2_innerWorld: {
                            type: Type.OBJECT,
                            properties: {
                                title: { type: Type.STRING },
                                greatestStrength: {
                                    type: Type.OBJECT,
                                    properties: {
                                        name: { type: Type.STRING, description: "A unique name for the child's greatest strength, derived from a combination of lifePath.number and birthday number (e.g., 'Practical Intuition')" },
                                        description: { type: Type.STRING, description: "A detailed paragraph explaining this strength, how it manifests in the child's behavior, and why it is significant." }
                                    },
                                    required: ["name", "description"],
                                    propertyOrdering: ["name", "description"]
                                },
                                coreChallenge: {
                                    type: Type.OBJECT,
                                    properties: {
                                        name: { type: Type.STRING, description: "A clear name for the child's main life lesson (e.g., 'Building True Self-Confidence')." },
                                        description: { type: Type.STRING, description: "A compassionate explanation of the core challenge, using challenges.main. If karmicDebtOrigin is present, explain it as a logical reason for this challenge." }
                                    },
                                    required: ["name", "description"],
                                    propertyOrdering: ["name", "description"]
                                },
                                hiddenFear: {
                                    type: Type.OBJECT,
                                    properties: {
                                        name: { type: Type.STRING, description: "A name for the child's hidden fear, inferred from the shadow side of their lifePath.number (e.g., 'Fear of Powerlessness')." },
                                        description: { type: Type.STRING, description: "A paragraph explaining this fear, how it might manifest in the child's behavior, and why it is important for the parent to understand." }
                                    },
                                    required: ["name", "description"],
                                    propertyOrdering: ["name", "description"]
                                },
                                reflectionQuestions: {
                                    type: Type.ARRAY,
                                    description: "An array of 2-3 thought-provoking questions for the parent to reflect on regarding their child's inner world.",
                                    items: { type: Type.STRING }
                                }
                            },
                            required: ["title", "greatestStrength", "coreChallenge", "hiddenFear", "reflectionQuestions"],
                            propertyOrdering: ["title", "greatestStrength", "coreChallenge", "hiddenFear", "reflectionQuestions"]
                        },
                        chapter3_parentsPlaybook: {
                            type: Type.OBJECT,
                            properties: {
                                title: { type: Type.STRING },
                                introduction: { type: Type.STRING, description: "A brief introduction explaining that this chapter provides actionable strategies." },
                                educationStyle: {
                                    type: Type.OBJECT,
                                    properties: {
                                        name: { type: Type.STRING, description: "A descriptive name for the recommended parenting/education style (e.g., 'The Empowering Coach')" },
                                        points: {
                                            type: Type.ARRAY,
                                            description: "An array of 3-4 bullet points with specific, actionable strategies for the child's learning and development. Must incorporate the Personal Year theme.",
                                            items: { type: Type.STRING }
                                        }
                                    },
                                    required: ["name", "points"],
                                    propertyOrdering: ["name", "points"]
                                },
                                communicationKeys: {
                                    type: Type.ARRAY,
                                    items: {
                                        type: Type.OBJECT,
                                        description: "An array of 3-5 specific communication strategies to help the parent effectively connect with their child.",
                                        properties: {
                                            insteadOf: { type: Type.STRING, description: "A common phrase a parent might say."},
                                            tryThis: { type: Type.STRING, description: "A more effective and empowering alternative phrase that addresses the child's coreChallenge and hiddenFear." },
                                            whyItWorks: { type: Type.STRING, description: "The psychological reason the alternative phrase is more effective." }
                                        },
                                        required: ["insteadOf", "tryThis", "whyItWorks"],
                                        propertyOrdering: ["insteadOf", "tryThis", "whyItWorks"]
                                    }
                                },
                                socialAndFriendshipStyle: { type: Type.STRING, description: "A paragraph explaining the child's social tendencies based on their core archetype, with nuance added from challenges.current.number. Include how they might be learning to navigate social situations right now." },
                                reflectionQuestions: {
                                    type: Type.ARRAY,
                                    description: "An array of 2-3 thought-provoking questions for the parent to reflect on regarding their communication style, the child's social style and education style.",
                                    items: { type: Type.STRING }
                                }
                            },
                            required: ["title", "introduction","educationStyle", "communicationKeys", "socialAndFriendshipStyle", "reflectionQuestions"],
                            propertyOrdering: ["title", "introduction", "educationStyle", "communicationKeys", "socialAndFriendshipStyle", "reflectionQuestions"]
                        },
                        chapter4_ignitingPassions: {
                            type: Type.OBJECT,
                            properties: {
                                title: { type: Type.STRING },
                                recommendedHobbies: {
                                    type: Type.ARRAY,
                                    items: {
                                        type: Type.OBJECT,
                                        properties: {
                                            tier: { type: Type.STRING, description: "The tier of the recommendation, e.g., 'Tier 1' for primary hobbies." },
                                            theme: { type: Type.STRING, description: "A brief theme or focus for the hobbies, e.g., 'Creative Expression'." },
                                            items: {
                                                type: Type.ARRAY,
                                                description: "An array of 3-5 recommended specific hobbies",
                                                items: { type: Type.STRING }
                                            }
                                        },
                                        required: ["tier", "theme", "items"],
                                        propertyOrdering: ["tier", "theme", "items"]
                                    }
                                },
                                recommendedCareers: {
                                    type: Type.ARRAY,
                                    items: {
                                        type: Type.OBJECT,
                                        properties: {
                                            tier: { type: Type.STRING, description: "The tier of the recommendation, e.g., 'Tier 1' for primary career paths." },
                                            items: {
                                                type: Type.ARRAY,
                                                description: "An array of 3-5 recommended specific career paths for the future.",
                                                items: { type: Type.STRING }
                                            }
                                        },
                                        required: ["tier", "items"],
                                        propertyOrdering: ["tier", "items"]
                                    }
                                },
                                reflectionQuestions: {
                                    type: Type.ARRAY,
                                    description: "An array of 1-2 thought-provoking questions for the parent to reflect on regarding their child's passions and future aspirations.",
                                    items: { type: Type.STRING }
                                }
                            },
                            required: ["title", "recommendedHobbies", "recommendedCareers", "reflectionQuestions"],
                            propertyOrdering: ["title", "recommendedHobbies", "recommendedCareers", "reflectionQuestions"]
                        },
                        conclusion: { type: Type.STRING, description: "A final, uplifting paragraph summarizing the child's potential and the parent's role as a guide. It should be compassionate and empowering, leaving the parent with a sense of hope and purpose." },
                    },
                    required: ["reportTitle", "chapter1_innerTeam", "chapter2_innerWorld", "chapter3_parentsPlaybook", "chapter4_ignitingPassions", "conclusion"],
                    propertyOrdering: ["reportTitle", "chapter1_innerTeam", "chapter2_innerWorld", "chapter3_parentsPlaybook", "chapter4_ignitingPassions", "conclusion"]
                }
            },
            
            systemInstruction: ` 
System Instruction: Numerology-Based Parenting Guide Generator
1. #ROLE & GOAL#
You are an expert in developmental psychology and Pythagorean numerology, with a talent for translating complex symbolic data into practical, logical, and empowering advice for parents. Your goal is to generate a comprehensive parenting guide based on a child's numerology data. The report MUST NOT be predictive or fortune-telling. It must be a logical, compassionate, and actionable tool that helps a parent understand their child's innate personality, challenges, and talents, and provides concrete strategies for education and guidance.

2. #TONE & PRINCIPLES#

* **Age-Appropriate Context is CRITICAL**: User is ${age} year old. All examples, scenarios, and advice provided in the report MUST be tailored to be age-appropriate. The expression of a 'Powerhouse' at age 6 (playground politics) is different from age 16 (school projects, part-time jobs). Explicitly mention the age context where relevant.

Empowering, Not Fatalistic: Focus on potential, lessons, and guidance. Avoid absolute statements about the future.

Practical & Logical: Provide concrete examples and explain the "why" behind behaviors. The karmicDebtOrigin is a tool for logical explanation, not for discussing past lives.

Compassionate & Supportive: The tone should feel like a wise and caring coach speaking to a parent.

Language": Use ${language} for all text, ensuring it is culturally appropriate and resonates with the target audience.

Output Token: Maximum 2500 tokens for the entire report.
`
        },
        contents: {
            text: `You will utilize the numerology data given below containing all the necessary calculated numbers and information to generate the report:

{
    "mainPersonalityNumber": ${personality},

    "lifePath": {
      "number": ${lifePath},
      "isMaster": ${isMaster}, // true or false
      "karmicDebtOrigin": ${karmicDebtOrigin} // null or a number like 13, 14, 16, 19
    },

    "birthdayNumber": ${birthday},
    "challengesNumber": {
      "main": ${challenges.main}, // e.g., 1, 2, 3, etc.
      "current": {
        "number": ${challenges.current.number}, // e.g., 1, 2, 3, etc.
        "period": ${challenges.current.period} // "first" or "second"
      }
    },
    "personalYear": ${personalYear},
}`
        }

    }); 
    
    console.log(opening.text); // This is showed to user, it is the opening message to start the report generation
}


class NumerologyCalculator {
    /**
     * Reduces a number to a single digit, unless it's a Master Number (11, 22).
     * This is the standard Pythagorean reduction method.
     * @param {number} num - The number to reduce.
     * @returns {number} The reduced single-digit number or a Master Number.
     */
    reduceNumber(num) {
        // Master numbers 11 and 22 are not reduced further in most cases.
        if (num === 11 || num === 22) {
            return num;
        }
        let sum = num;
        // Loop until the number is a single digit.
        while (sum > 9) {
            sum = String(sum).split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
            // Check for Master Numbers that appear during the reduction process.
            if (sum === 11 || sum === 22) {
                return sum;
            }
        }
        return sum;
    }

    /**
     * A simple reduction rule that does not preserve Master Numbers.
     * Used for specific calculations like Challenge Numbers.
     * @param {number} num - The number to reduce.
     * @returns {number} The single-digit number.
     */
    forceReduceToSingleDigit(num) {
        let sum = num;
        while (sum > 9) {
            sum = String(sum).split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
        }
        return sum;
    }

    /**
     * The original addition rule from your code, kept for legacy calculations.
     * @param {number} n1
     * @param {number} n2
     * @returns {number}
     */
    addRule(n1, n2) {
        const sum = n1 + n2;
        if (sum > 9 && sum !== 11 && sum !== 22) { // Modified to not reduce master numbers here
            const s = String(sum);
            const reducedSum = parseInt(s[0], 10) + parseInt(s[1], 10);
            return reducedSum;
        }
        return sum;
    }
    
    /**
     * Converts a number to its corresponding Wu Xing element.
     * @param {number} num - The number to convert.
     * @returns {string} The Wu Xing element.
     */
    wuxing(num) {
        const mapping = {
            1: '水', 2: '土', 3: '木', 4: '木', 5: '土',
            6: '金', 7: '金', 8: '土', 9: '火'
        };
        return mapping[this.forceReduceToSingleDigit(num)] || '未知';
    }

    /**
     * Main function to start the calculation process.
     */
    async calculate() {
        const birthday = await question("请按格式 YYYY-MM-DD 输入您孩子的阳历出生日期： ");

        if (birthday && birthday.length === 10) {
            const bdinfo = birthday.split('-');
            const [yearStr, monthStr, dayStr] = bdinfo;

            if (yearStr.length === 4 && monthStr.length === 2 && dayStr.length === 2 && parseInt(monthStr, 10) <= 12 && parseInt(dayStr, 10) <= 31) {
                console.log(`\n您孩子的出生年月日为：${yearStr}年${monthStr}月${dayStr}日`);
                const yn = await question('确认请输入Y，修正请输入N：')

                if (yn.toLowerCase() === 'y') {
                    const results = this.processNumbers(yearStr, monthStr, dayStr);
                    // Output the final data as a structured JSON object
                    console.log("\n--- 计算结果 (JSON) ---");
                    console.log(JSON.stringify(results, null, 2));
                    rl.close();
                    return results; // Return the results for further processing or reporting
                } else {
                    console.log('输入已取消，请重新运行程序。');
                    rl.close();
                }

            } else {
                console.log('日期格式不正确，请确保为 YYYY-MM-DD 格式且日期有效。');
                rl.close();
            }
        } else {
            console.log('输入格式不正确，请输入10位日期，例如：2018-01-02');
            rl.close();
        }
}

    /**
     * Processes all numerology calculations and returns a structured object.
     * @param {string} yearStr
     * @param {string} monthStr
     * @param {string} dayStr
     * @returns {object} A structured object containing all calculated numbers.
     */
    processNumbers(yearStr, monthStr, dayStr) {
        // --- Legacy Number Calculations (as per original logic) ---
        const A = parseInt(dayStr[0], 10);
        const B = parseInt(dayStr[1], 10);
        const C = parseInt(monthStr[0], 10);
        const D = parseInt(monthStr[1], 10);
        const E = parseInt(yearStr[0], 10);
        const F = parseInt(yearStr[1], 10);
        const G = parseInt(yearStr[2], 10);
        const H = parseInt(yearStr[3], 10);

        const I = this.addRule(A, B);
        const J = this.addRule(C, D);
        const K = this.addRule(E, F);
        const L = this.addRule(G, H);
        const M = this.addRule(I, J);
        const N = this.addRule(K, L);
        const O = this.addRule(M, N); // Main Personality Number
        const P = this.addRule(M, O);
        const Q = this.addRule(N, O);
        const R = this.addRule(Q, P);
        const X = this.addRule(I, M);
        const W = this.addRule(J, M);
        const S = this.addRule(X, W);
        const V = this.addRule(K, N);
        const U = this.addRule(L, N);
        const T = this.addRule(V, U);

        // --- Standard Pythagorean Calculations ---
        const monthVal = parseInt(monthStr, 10);
        const dayVal = parseInt(dayStr, 10);
        const yearVal = parseInt(yearStr, 10);
        const currentYear = 2025; // Target year for calculations

        // 1. Birthday Number ( innate talent)
        const birthdayNumber = this.reduceNumber(dayVal);

        // 2. Life Path Number (with Karmic Debt and Master Number detection)
        const reducedMonth = this.reduceNumber(monthVal);
        const reducedDay = this.reduceNumber(dayVal);
        const reducedYear = this.reduceNumber(String(yearVal).split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0));
        
        const lifePathSum = reducedMonth + reducedDay + reducedYear;
        const lifePathNumber = this.reduceNumber(lifePathSum);
        
        let karmicDebtOrigin = null;
        if ([13, 14, 16, 19].includes(lifePathSum)) {
            karmicDebtOrigin = lifePathSum;
        }

        // 3. Challenge Numbers
        const challengeMonth = this.forceReduceToSingleDigit(reducedMonth); 
        const challengeDay = this.forceReduceToSingleDigit(reducedDay);
        const challengeYear = this.forceReduceToSingleDigit(reducedYear);

        const challenge1 = Math.abs(challengeMonth - challengeDay);
        const challenge2 = Math.abs(challengeDay - challengeYear);
        const mainChallenge = Math.abs(challenge1 - challenge2);
        
        const ageInTargetYear = currentYear - yearVal;
        const firstChallengeEndAge = 36 - this.forceReduceToSingleDigit(lifePathNumber);
        
        let currentChallenge = { number: null, period: 'main' };
        if (ageInTargetYear <= firstChallengeEndAge) {
            currentChallenge = { number: challenge1, period: 'first' };
        } else {
            currentChallenge = { number: challenge2, period: 'second' };
        }

        // 4. Personal Year Number
        const personalYearNumber = this.reduceNumber(reducedMonth + reducedDay + this.reduceNumber(currentYear));

        // --- Structure the final output ---
        const results = {

            age: currentYear - parseInt(yearStr, 10),

            mainPersonality: O,

            lifePath: {
                number: lifePathNumber,
                isMaster: [11, 22].includes(lifePathNumber),
                karmicDebtOrigin: karmicDebtOrigin
            },
            birthday: birthdayNumber,
            challenges: {
                main: mainChallenge,
                current: currentChallenge
            },
            personalYear: personalYearNumber
        };

        return results;
    }
}

const calculator = new NumerologyCalculator();
const result = await calculator.calculate();
getReport({
    personality: result.mainPersonality, 
    age: result.age, 
    lifePath: result.lifePath.number,
    isMaster: result.lifePath.isMaster, 
    karmicDebtOrigin: result.lifePath.karmicDebtOrigin, 
    birthday: result.birthday, 
    challenges: result.challenges, 
    personalYear: result.personalYear} ).then(report => {
    console.log("Report generated successfully:", report);
}).catch(error => {
    console.error("Error generating report:", error);
});
