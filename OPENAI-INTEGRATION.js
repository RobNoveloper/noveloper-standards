/**
 * OpenAI Integration Module for Noveloper
 * 
 * This file contains helper functions for integrating with OpenAI's API
 * for various AI-powered features on the Noveloper website.
 */

import OpenAI from "openai";

// Initialize the OpenAI client with API key from environment variable
// Make sure to set OPENAI_API_KEY in your environment
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user

/**
 * Analyzes input text to generate creative software concepts
 * 
 * @param {string} description - The user's problem or idea description
 * @returns {Promise<Object>} - A structured response with software concept ideas
 */
export async function generateSoftwareConcept(description) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an AI software concept generator for Noveloper, an AI-powered creative studio. Generate creative software concepts based on user needs. Output in JSON format with name, description, features (array), benefits (array), and implementation_time_estimate (string)."
        },
        {
          role: "user",
          content: description
        }
      ],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("OpenAI software concept generation error:", error);
    throw new Error("Failed to generate software concept");
  }
}

/**
 * Analyzes a business description to suggest custom software solutions
 * 
 * @param {string} businessDescription - Description of the business and its challenges
 * @returns {Promise<Object>} - A structured response with software recommendations
 */
export async function analyzeBusiness(businessDescription) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a business analysis expert for Noveloper. Analyze business descriptions and suggest custom software solutions to replace Excel processes. Provide output in JSON format with current_pain_points (array), recommended_solutions (array of objects with name, description, benefits), and estimated_roi (string)."
        },
        {
          role: "user",
          content: businessDescription
        }
      ],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("OpenAI business analysis error:", error);
    throw new Error("Failed to analyze business needs");
  }
}

/**
 * Analyzes an existing process and creates a digital transformation plan
 * 
 * @param {string} processDescription - Description of the current business process
 * @returns {Promise<Object>} - A structured digital transformation plan
 */
export async function createTransformationPlan(processDescription) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "As Noveloper's digital transformation expert, create a step-by-step plan to transform manual business processes into digital workflows. Output in JSON format with current_state (object), desired_state (object), transformation_steps (array), implementation_timeline (object), and expected_outcomes (array)."
        },
        {
          role: "user",
          content: processDescription
        }
      ],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("OpenAI transformation plan error:", error);
    throw new Error("Failed to create transformation plan");
  }
}

/**
 * Generates a custom UI mockup description based on business requirements
 * 
 * @param {string} requirements - The UI requirements and business needs
 * @returns {Promise<Object>} - A structured UI mockup description
 */
export async function generateUIMockup(requirements) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are Noveloper's UI design expert. Create detailed UI mockup descriptions based on business requirements. Output in JSON format with layout (object), color_scheme (object), components (array), user_flows (array), and accessibility_considerations (array)."
        },
        {
          role: "user",
          content: requirements
        }
      ],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("OpenAI UI mockup generation error:", error);
    throw new Error("Failed to generate UI mockup");
  }
}

/**
 * Analyzes a website screenshot for UI/UX improvement suggestions
 * 
 * @param {string} base64Image - The screenshot in base64 format
 * @returns {Promise<string>} - Detailed analysis and suggestions
 */
export async function analyzeScreenshot(base64Image) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "As Noveloper's UI/UX expert, analyze this website screenshot and provide detailed improvement suggestions focusing on usability, accessibility, visual hierarchy, and conversion optimization."
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Please analyze this website screenshot and suggest improvements:"
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ]
        }
      ]
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI screenshot analysis error:", error);
    throw new Error("Failed to analyze screenshot");
  }
}

/**
 * Generates a workflow diagram description based on process requirements
 * 
 * @param {string} processRequirements - Description of the process requirements
 * @returns {Promise<Object>} - A structured workflow diagram description
 */
export async function generateWorkflowDiagram(processRequirements) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are Noveloper's process optimization expert. Create detailed workflow diagram descriptions based on business process requirements. Output in JSON format with actors (array), steps (array with id, description, actor, next_steps), decision_points (array), and optimization_suggestions (array)."
        },
        {
          role: "user",
          content: processRequirements
        }
      ],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("OpenAI workflow diagram generation error:", error);
    throw new Error("Failed to generate workflow diagram");
  }
}