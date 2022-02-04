import processStateModel from '../models/processStateModel.js'

export const getAllProcessStates = async (_, res) => {
	const processStates = await processStateModel.find({})
	res.send(processStates)
}

export const getProcessState = async (req, res) => {
	const processStates = await processStateModel.find({ _id: req.params.idPs })
	res.send(processStates[0])
}

export const addProcessState = async (req, res) => {
	const processState = new processStateModel(req.body)
	await processState.save()
	res.send(processState)
}

export const updateProcessState = async (req, res) => {
	const processState = await processStateModel.findByIdAndUpdate(req.params.idPs, req.body)
	await processState.save()
	res.send(processState)
}

export const deleteProcessState = async (req, res) => {
	await processStateModel.findByIdAndDelete(req.params.idPs)
	res.send(`ProcessState ${req.params.idPs} deleted`)
}
