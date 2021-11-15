export interface GitlabEvent {
	eventType: string;
	groupId: string;
	projectId: string;
	projectUrl: string;
	author: string;
	authorAvatar?: string;
	name: string;
	description: string;
	action?: string;
	date: Date,
}