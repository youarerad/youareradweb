export default async function fetchCreators() {
	return await prisma.creator.findMany()
}
