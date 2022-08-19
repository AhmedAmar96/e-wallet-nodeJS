const findService = async (models, skip, limit, searchKey, fields, popul) => {
    try {
        let data;

        if (searchKey) {
            const columns = [...fields.map((field) => {
                return { [field]: { $regex: searchKey } }
            })];
            data = await models.model.find({
                $or: columns
            }).skip(skip).limit(limit).populate(popul.userPath, popul.userSelect);
            return data;

        } else {

            //لو الموديل هو الاب وليه ابن 
            if (models.childModel) {
                console.log("a1");
                let modelArr = [];
                const modelRef = popul.modelRef;
                const cursor = models.model.find()
                    .skip(skip)
                    .limit(limit)
                    .populate(popul.createdPath, popul.userSelect)
                    .populate(popul.updatedPath, popul.userSelect)
                    .cursor();
                for (
                    let doc = await cursor.next();
                    doc != null;
                    doc = await cursor.next()
                ) {
                    const obj = { ...doc._doc };
                    modelArr.push(obj)
                }
                return modelArr;

            } else {
                //لو الموديل هو الابن
                let modelArr = [];
                const cursor = models.find()
                    .skip(skip)
                    .limit(limit)
                    .populate(popul.createdPath, popul.userSelect)
                    .populate(popul.updatedPath, popul.userSelect)
                    .populate(popul.modelPath, popul.modelSelect)
                    .cursor();
                for (
                    let doc = await cursor.next();
                    doc != null;
                    doc = await cursor.next()
                ) {
                    const obj = { ...doc._doc };
                    modelArr.push(obj)
                }
                return modelArr;
            }
        }
    } catch (error) {
        return error;
    }
}

module.exports = findService;