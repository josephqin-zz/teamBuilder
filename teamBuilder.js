//parse string[] graph information to 2-dimension array
var parseGraph = matrix => matrix
                         .map((d)=>d.split('').map(v=>+v)) 
                         .map((d)=>d.map((s,index)=>s===1?index:null)
                         .filter((d)=>d!==null))


var commonList = (list1,list2) => list2.filter((d)=>list1.includes(d))



class TeamBuilder {
	constructor(graphContext){
		this.graph = parseGraph(graphContext)
	}
    //get all the reachable nodes list from the given nodeID
    getAllReachabledNodes(nodeIndex){
            
        let crt = [...this.graph[nodeIndex]]
        let diff = [...this.graph[nodeIndex]]
            
            while(diff.length>0){
              let oldlist = [...crt]

              let newlist = diff.reduce((acc,nid)=>([...acc,...this.graph[nid]]),[...crt])
                        		.filter((d,i,self)=>self.indexOf(d)===i)

              diff = newlist.filter((d)=>!oldlist.includes(d))
              crt = [...newlist]          
            }
            return [...crt,nodeIndex].filter((d,i,self)=>self.indexOf(d)===i)
                                     .sort((a,b)=>a-b)
        
        }




    specialLocations(){

        let newgraph = this.graph.map((d,index)=>this.getAllReachabledNodes(index));

        let reachAll = newgraph.reduce((acc,d)=>d.length===this.graph.length?acc+1:acc,0)

        let canbeReached = newgraph.reduce((acc,d)=>commonList(acc,d)).length


    	return [reachAll,canbeReached]
    }

}