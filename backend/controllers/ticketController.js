const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// @desc    Access current user's tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
  // Get user
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }
  const tickets = await Ticket.find({ user: req.user.id })
  res.status(200).json(tickets)
})
// @desc    Access one of current user's tickets
// @route   GET /api/tickets/:id
// @access  Private
const getTicket = asyncHandler(async (req, res) => {
  // Get user
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }
  const ticket = await Ticket.findById(req.params.id)
  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }
  res.status(200).json(ticket)
})
// @desc    Create new ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
  // Get ticket details
  const { product, description } = req.body
  if (!product || !description) {
    res.status(400)
    throw new Error('Please add product and description')
  }
  // Get user
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }
  // Create ticket
  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new',
  })
  res.status(201).json(ticket)
})
// @desc    Delete one of current user's tickets
// @route   DELETE /api/tickets/:id
// @access  Private
const deleteTicket = asyncHandler(async (req, res) => {
  // Get user
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }
  const ticket = await Ticket.findById(req.params.id)
  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }
  await ticket.remove()
  res.status(200).json({ success: true })
})
// @desc    Update one of current user's tickets
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = asyncHandler(async (req, res) => {
  // Get user
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }
  const ticket = await Ticket.findById(req.params.id)
  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }
  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  res.status(200).json(updatedTicket)
})

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
}
