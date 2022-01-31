import processStateModel from '../models/processStateModel.js'

export const getAllProcessStates = async (_, res) => {
  	const processStates = await processStateModel.find({})
  	res.send(processStates)
}

export const getProcessState = async (req, res) => {
  	const processStates = await processStateModel.find({ _id: req.params.idProcessSate })
  	res.send(processStates[0])
}

export const addProcessState = async (req, res) => {
  	const processState = new processStateModel(req.body)
  	await processState.save()
  	res.send(processState)
}