import moment from 'moment';

// Method to search a search jobs by a giving search query
function searchQuery(jobs:any[], baseJobs:any[], searchQuery:string){	
	let query = searchQuery.trim().toLowerCase();
	let newJobs = [...baseJobs].filter(
		job=>job.title.toLowerCase().indexOf(query) >= 0);
	if(!newJobs.length){
		//console.log('not found in title');
		newJobs = [...baseJobs].filter(job=>job.description.indexOf(query) >= 0);
	}
	else{
		//found in title
		return newJobs;
	}
	if(!newJobs.length){
		newJobs = [];
		//console.log('not found in caracteristics')
	}
	else{
		//console.log('found in caracteristics');
	}
	return newJobs;
}

function sortByMostRecent(jobs:any[]){	
    const now_timestamp = Math.floor(new Date().valueOf()/1000);
    if(jobs){
        let sorted_jobs = jobs.sort((job1, job2)=> {
            if(job1.created_at && job2.created_at){
                // job created timestamp
                let j1ts = Math.floor(new Date(job1.created_at).valueOf()/1000);
                let j2ts = Math.floor(new Date(job2.created_at).valueOf()/1000);
                // console.log('exists', j1ts, j2ts)
                if(j2ts > j1ts){
                    return 4;
                }
                else if(j2ts < j1ts){
                    return -4;
                }
                else {
                    return 0;
                }
            }
            else{
                return 0
            }
        })
        return sorted_jobs;
    }
    return jobs;
}

function sortByMostPopular(jobs:any[]){	
    const now_timestamp = Math.floor(new Date().valueOf()/1000);
    if(jobs){
        let sorted_jobs = jobs.sort((job1, job2)=> {
            // job created timestamp
            let j1f = (job1 && job1.favorite_users_ids && job1.favorite_users_ids)
            ?job1.favorite_users_ids.length
            :0
            let j2f = (job2 && job2.favorite_users_ids && job2.favorite_users_ids)
            ?job2.favorite_users_ids.length
            :0
            if(j2f > j1f){
                return 4;
            }
            else if(j2f < j1f){
                return -4;
            }
            else {
                return 0;
            }
        })
        return sorted_jobs;
    }
    return jobs;
}

function sortJobsByCategories(jobs:any[], baseJobs:any[], selectedCategories:any[]){	
	let sortedJobs:any[] = [];
	baseJobs.map(job => {
		let categoryRelatedToTheJob = selectedCategories.find(category=>{
			return category.id==job.category.id;
		});
		if(categoryRelatedToTheJob){
			sortedJobs.push(job);
		}
	})	
	//
	if(selectedCategories.length > 0){
		let lastSelectedCategory = selectedCategories[selectedCategories.length-1]
		sortedJobs = sortedJobs.sort((a, b) => {
			if(lastSelectedCategory.id == a.category.id){
				return -1;
			}	
			return 0;
		})
	}
	return sortedJobs;
}



export {
    searchQuery,
    sortByMostRecent,
    sortByMostPopular,
    sortJobsByCategories,
}
