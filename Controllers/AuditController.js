const Audit = require('../Models/AuditModel');
const errorMessages = require('../utils/ErrorMessages');

/**
 * @swagger
 * /audit:
 *   post:
 *     summary: Create a new Audit
 *     tags:
 *       - Audit
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Audit object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UserID:
 *                 type: string
 *               UserEmail:
 *                 type: string
 *               Action:
 *                 type: string
 *               Page:
 *                 type: string
 *               Browser:
 *                 type: string
 *               OS:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Audit created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Audit'
 *       '500':
 *         description: Error creating Audit
 *         content:
 *           application/json:
 *             example:
 *               message: Error creating Audit
 */

async function createAudit(req, res) {
    try {
      const { UserID, UserEmail, Action, Page, Browser, OS } = req.body;
      const newAudit = new  Audit({
        UserID, 
        UserEmail, 
        Action, 
        Page, 
        Browser, 
        OS
      });
      await newAudit.save();
      return res.status(201).json({ message: errorMessages.AISS });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: errorMessages.ECU });
    }
  }
  
  module.exports = {
    createAudit
  };