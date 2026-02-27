import { Octokit } from "@octokit/core";

import { GithubApiCallSetting as Setting, GithubApiCallReturn as Return, User } from "@/types/index";

export const getReadmeRepo = async(user: string, token: string) =>{
    const usr = user;
    const repo = user;
    const params = {
        method: "GET",
        url: `/repos/${usr}/${repo}`,
        params: {
            owner: usr,
            repo: repo,
        }
    }
    const data = await githubApiCall(token, params);
    return data;
}

export const getReadmeContent = async(user: string, token: string) =>{
    const usr = user;
    const repo = user;
    const params: Setting = {
        method: "GET",
        url: `/repos/${usr}/${repo}/contents/README.md`,
        params: {
            owner: usr,
            repo: repo,
        }
    }
    const data = await githubApiCall(token, params);
    const readme = {
        success: data?.data?.content ? true : false,
        content: data?.data?.content ? decodeURIComponent(escape(atob(data?.data?.content))) : ""
    };
    return readme;
}

export const doesReadmeChangesNeedCommit = async(content: string, user: string, token: string) =>{
    const readme = await getReadmeContent(user, token);
    return readme.success ? 
        content !== readme.content 
        :
        readme.success;
}

const GetFileData = async({user, token}: {user: User, token: string}) =>{
    const username = user.username;
    const usr = username;
    const repo = username;
    const params = {
        method: "GET",
        url: `/repos/${usr}/${repo}/contents/README.md`,
        params: {
            owner: usr,
            repo: repo,
            path: 'README.md',
        }
    }

    const data = await githubApiCall(token, params);
    return data?.data;
}

export const initReadmeToGithub = async({markdown, user, token}: {markdown: string, user: User, token: string}) =>{
    markdown += "\n";

    const username = user.username
    const usr = username;
    const repo = username;
    const base64 = btoa(unescape(encodeURIComponent(markdown || "")));
    const params = {
        method: "PUT",
        url: `/repos/${usr}/${repo}/contents/README.md`,
        params: {
            owner: usr,
            repo: repo,
            path: 'README.md',
            message: "[chore] init markdown",
            committer: {
                name: user.name,
                email: user.email,
            },
            content: base64,
        }
    }

    const data = await githubApiCall(token, params);
    return data;
}

export const pushReadmeToGithub = async({markdown, user, token, message}: {markdown: string, user: User, token: string, message?: string}) =>{
    markdown += "\n";
    const needCommit = await doesReadmeChangesNeedCommit(markdown, user.username, token);
    if (!needCommit){
        return undefined;
    }


    const fileData = await GetFileData({user, token});
    const sha = fileData?.sha;

    const username = user.username
    const usr = username;
    const repo = username;
    const base64 = btoa(unescape(encodeURIComponent(markdown)));
    const params = {
        method: "PUT",
        url: `/repos/${usr}/${repo}/contents/README.md`,
        params: {
            owner: usr,
            repo: repo,
            path: 'README.md',
            message: "[chore] edit markdown",
            committer: {
                name: user.name,
                email: user.email,
            },
            content: base64,
            sha, 
        }
    }

    const data = await githubApiCall(token, params);
    return data;
}

export const createGitHubProject = async({markdown, user, token}: {markdown?: string, user: User, token: string}) =>{
    const username = user.username
    const usr = username;
    const repo = username;
    const params = {
        method: "POST",
        url: `/user/repos`,
        params: {
            name: repo,
            description: "My beautiful profile page generated from Moonarr!",
            'private': false,
        }
    }

    console.log("markdown")
    console.log(markdown)
    console.log("markdown")

    const data = await githubApiCall(token, params);
    
    if (markdown){
        const dataPushed = await initReadmeToGithub({markdown, user, token});
    }

    return data;
}

const githubApiCall = async(token: string, settings: Setting) =>{
    const octokit = new Octokit({
        auth: token
    })

    let data;
    try{
        data = await octokit.request(`${settings.method} ${settings.url}`, {
            ...settings.params,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
    }
    catch (error){
        console.error(`error: ${error}`);
    }
    return data || undefined;
}