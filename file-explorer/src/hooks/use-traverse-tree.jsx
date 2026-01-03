const useTraverseTree = () => {
    function insertNode(tree, item, isFolder, folderID) {
        if(tree.id === folderID) {
            tree.items.unshift({  // unshift is same as push but adds at very begininng
                id: new Date().getTime(),
                name: item,
                isFolder,
                items: []
            })
            return tree;
        }

        let latestNode = [];
        latestNode = tree.items.map((ob) => {
            return insertNode(ob, item, isFolder, folderID);
        })

        return {...tree, items: latestNode};
    }

    return {insertNode};
}

export default useTraverseTree;