import { Octokit } from "@octokit/core";

import { GithubApiCallSetting as Setting, User } from "@/types/index";

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
    console.log(readme)
    return readme;
}

export const pushReadmeToGithub = async({markdown, user, accessToken}: {markdown: string, user: string, accessToken: string}) =>{
    const usr = user;
    const repo = user;
    const base64 = btoa(unescape(encodeURIComponent(markdown)));
    const params = {
        method: "GET",
        url: `/repos/${usr}/${repo}`,
        params: {
            owner: usr,
            repo: repo,
        }
    }
    const data = await githubApiCall(accessToken, params);
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
    catch{
        console.error("REPOSITORY DOESN'T EXIST!");
    }
    return data || undefined;
}