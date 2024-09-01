// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserProfile {
    // Define a struct to hold user profile information
    struct Profile {
        string name;
        uint age;
        string email;
    }

    // Mapping from user address to their Profile
    mapping(address => Profile) private profiles;

    // Mapping to track ownership of profiles
    mapping(address => address) private profileOwners;

    // Address of the contract owner (admin)
    address private owner;

    // Events to log when a profile is set or updated
    event ProfileSet(address indexed user, string name, uint age, string email);
    event ProfileDeleted(address indexed user);

    // Modifier to restrict access to the contract owner
    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only the contract owner can perform this action"
        );
        _;
    }

    // Modifier to restrict access to profile owner
    modifier onlyProfileOwner(address user) {
        require(
            profileOwners[user] == msg.sender,
            "Only the profile owner can update their profile"
        );
        _;
    }

    // Constructor to set the contract owner
    constructor() {
        owner = msg.sender;
    }

    // Function to set or update user profile
    function setProfile(
        string memory _name,
        uint _age,
        string memory _email
    ) public {
        // Update the profile mapping
        profiles[msg.sender] = Profile(_name, _age, _email);
        // Track the owner of the profile
        profileOwners[msg.sender] = msg.sender;

        // Emit the ProfileSet event
        emit ProfileSet(msg.sender, _name, _age, _email);
    }

    // Function to get user profile
    function getProfile(
        address user
    ) public view returns (string memory name, uint age, string memory email) {
        Profile memory profile = profiles[user];
        return (profile.name, profile.age, profile.email);
    }

    // Admin function to delete a user profile
    function deleteProfile(address user) public onlyOwner {
        delete profiles[user];
        delete profileOwners[user];

        // Emit the ProfileDeleted event
        emit ProfileDeleted(user);
    }
}
